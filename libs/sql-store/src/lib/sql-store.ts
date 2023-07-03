import initSql from 'sql.js'
import { createSql } from './sql/create'
import { ZipUtils } from './zip'
import { defaultInfo } from './const/defaultInfo'
import { set, get } from 'idb-keyval'
import dayjs from 'dayjs'
import { jsonKey, boolKey } from './const'
import { getFilterSql, getFullDoseCountSql } from './utils/filter'
import { Direction, FilterParamsProps } from './type/filter'
import { QueryTaskChildTotal, QueryTaskTakersSQL } from './sql/query'
import { PackInfo, Datum } from './type/service/datapandora'
import { IDiffInfoResponse } from './type/service/increment'
import { IUserParams } from './type'
import { defaultDiffStamp } from './const'
import _ from 'lodash'
import { parseError, yieldConsole } from './utils/console'

const wasmUrl = '/sql-wasm.wasm'

type RecordInfo = Pick<PackInfo['data'][0], 'id' | 'attach_info'>

function checkDecentTable(k: string) {
  return !['comment'].includes(k)
}

const defaultRecord = {
  id: '0',
  attach_info: defaultDiffStamp
}

class SqlStore {
  private db: initSql.Database | null = null

  private zipObj: any = null

  private timeDiff = 0

  isReady = false

  // private host = 'https://api.flyele.vip'
  private host = 'http://localhost:8888/api'

  private userId = ''

  private recordInfo: RecordInfo = _.cloneDeep(defaultRecord)

  private dbId = ''

  private recordKey = ''

  private token = ''

  async initDB(p: IUserParams) {
    this.isReady = false
    this.userId = p.userId
    const loadWasmUrl = p.wasmUrl || wasmUrl

    try {
      // 已存在打开的数据库（切换用户）- 重置
      if (this.db) {
        this.db.close()
        this.db = null
        this.recordInfo = _.cloneDeep(defaultRecord)
      }

      this.dbId = `${p.env}-${p.userId}`

      this.recordKey = `${this.dbId}-record`

      if (p.host !== 'https://api.flyele.vip') {
        this.host = p.host
      }

      this.token = p.token

      const SQL = await initSql({
        locateFile: () => loadWasmUrl
      })

      const data = await (
        await fetch(`${this.host}/userc/v2/system/now`)
      ).json()

      if (data.data) {
        this.timeDiff = Math.floor(Date.now() / 1000) - data.data
      }

      // 从indexeddb获取数据库
      const storeDB = await get(this.dbId)

      // 从indexeddb获取更新信息
      this.recordInfo = (await get(this.recordKey)) || this.recordInfo

      // 获取用户的初始化数据
      const list = await this.getUserData()

      const firstData = list[0]

      const createDB = () => {
        yieldConsole({
          type: 'createDB-start'
        })

        const db = new SQL.Database()
        this.db = db
        db.run(createSql)
        this.recordInfo = _.cloneDeep(defaultRecord)
        yieldConsole({
          type: 'createDB-end'
        })
      }

      if (firstData && firstData.type === 1) {
        // 存在全量包, 需要根据全量包重新建表
        createDB()

        await this.updateBundle(firstData)
      } else {
        if (storeDB) {
          // 存在用户数据库
          this.db = new SQL.Database(storeDB)
        } else if (!firstData) {
          // 不存在用户数据库且无全量数据, 建立空数据库
          createDB()
        }
      }

      // 更新差异包
      for (const data of list.filter(({ type }) => type === 2)) {
        await this.updateBundle(data)
      }

      // 更新差异数据
      await this.updateDiff()
    } catch (e) {
      console.error('initDB error', e)
    }

    this.isReady = true
  }

  updateToken(token: string) {
    this.token = token
  }

  private async getNeedUpdateTables(query: string) {
    const data = await this.request(
      `datasupport/v1/increment/check_update?${query}`
    )

    return data.data as string[]
  }

  // 获取需要更新的表数据
  private async updateDiff() {
    const info = this.recordInfo.attach_info

    const query = Object.entries(info)
      .filter(([k]) => checkDecentTable(k))
      .map(([k, v]) => {
        console.log('key', k, v)

        return `${k}=${v.id}`
      })
      .join('&')

    const taskIds: string[] = []

    const parentIds: string[] = []

    const list = await this.getNeedUpdateTables(query)

    const getTableUpdates = async (
      key: string,
      pageIdx: number,
      lastId: string
    ) => {
      const res = await this.getUpdates(key, lastId, pageIdx)

      if (!res.code && res.data) {
        try {
          if (key === 'task') {
            taskIds.push(...res.data.list.map((i) => i.keys['id']))
          }

          if (key === 'task_dispatch') {
            taskIds.push(...res.data.list.map((i) => i.keys['ref_task_id']))
          }

          if (key === 'tag_bind') {
            taskIds.push(...res.data.list.map((i) => i.keys['object_id']))
          }

          // 更新父事项收合数据
          if (key === 'task_config') {
            res.data.list.forEach((i) => {
              const _parentIds = i.data['parent_id'] as string | undefined

              if (_parentIds) {
                const parentId = _parentIds.split(',').pop()!

                taskIds.push(parentId)
                parentIds.push(parentId)
              }
            })
          }

          const { list } = res.data

          for (const item of list) {
            const { type, keys, data } = item

            // 删除逻辑
            this.db!.run(this.getDelSql(keys, key) + ';')

            // 重新插入数据
            if (type === 'insert' || type === 'update') {
              this.db!.run(this.getInsertSql(data, key) + ';')
            }
          }

          if (list.length) {
            const lastItem = list[list.length - 1]

            this.recordInfo.attach_info[key] = {
              id: lastItem.id
            }
          }

          if (list.length >= 20) {
            await getTableUpdates(key, pageIdx + 1, lastId)
          }
        } catch (e) {
          yieldConsole({
            type: 'error',
            data: {
              type: 'writting',
              key,
              ...parseError(e),
              res
            }
          })
        }
      }
    }

    for (const key of list.filter(checkDecentTable)) {
      await getTableUpdates(key, 1, this.recordInfo.attach_info[key].id)
    }

    this.updateDB()

    return {
      taskIds: [...new Set(taskIds.map((i) => i + ''))],
      parentIds: [...new Set(parentIds.map((i) => i + ''))]
    }
  }

  // 增量更新数据回传客户端
  async updateDiffForClient(params: { mode: 1 | 2 }): Promise<{
    taskIds: string[]
    parentIds: string[]
    list: any[]
  }> {
    const info = await this.updateDiff()

    const { taskIds, parentIds } = info

    if (!taskIds.length)
      return {
        taskIds: [],
        list: [],
        parentIds: []
      }

    const res = this.query({
      filter: { task_ids: info.taskIds },
      show_model: params.mode
    })

    console.log('@DIFF', {
      taskIds,
      list: res,
      parentIds
    })

    return {
      taskIds,
      parentIds,
      list: res
    }
  }

  private async getUpdates(key: string, lastId: string, pageIdx: number) {
    const data = await this.request(
      `datasupport/v1/increment?last_id=${lastId}&type=${key}&page_size=20&page_index=${pageIdx}`
    )

    return data as IDiffInfoResponse
  }

  // 更新增量包
  private async updateBundle(data: Datum) {
    const { sign_url, id, attach_info, type } = data

    yieldConsole({
      type: 'unzip-start',
      data
    })

    await this.fetchZip(sign_url)

    yieldConsole({
      type: 'unzip-end',
      data
    })

    this.recordInfo = { id, attach_info }

    await this.updateTable(type === 2)
  }

  private async request(url: string) {
    const requestUrl = `${this.host}/${url}`

    try {
      yieldConsole({ type: 'api-start', url: requestUrl })

      const data = await Promise.race([
        await (
          await fetch(requestUrl, {
            headers: {
              Authorization: this.token
            }
          })
        ).json(),
        new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error('timeout'))
          }, 5000)
        })
      ])

      yieldConsole({ type: 'api-end', url: requestUrl })

      return data
    } catch (e) {
      yieldConsole({
        type: 'error',
        data: {
          type: 'api-error',
          url: requestUrl,
          ...parseError(e)
        }
      })
    }
  }

  private async getUserData() {
    const lastId = this.recordInfo?.id || 0

    const data = (await this.request(
      `datapandora/v1/packinfo/get?last_id=${lastId}`
    )) as PackInfo

    return data.data
  }

  formatSelectValue({
    columns,
    values
  }: {
    columns: string[]
    values: any[][]
  }) {
    const keyAndI = Object.entries(columns)

    const data = new Array(values.length).fill('').map((v, mapI) => {
      //TODO 切换正常类型
      const obj: { [key: string]: any } = {}

      for (const [keyI, key] of keyAndI) {
        const value = values[mapI][Number(keyI)]

        if (jsonKey.includes(key)) {
          obj[key] = JSON.parse(value)
        } else if (boolKey.includes(key)) {
          obj[key] = Boolean(value)
        } else {
          obj[key] = /^(id)$|_id$/.test(key)
            ? value
              ? String(value)
              : ''
            : value
        }
      }

      return obj
    })

    return data
  }

  queryFullDoseCount() {
    const sqlCount = this.db!.exec(
      getFullDoseCountSql({ user_id: this.userId })
    )

    const data = sqlCount[0] ? this.formatSelectValue(sqlCount[0]) : []

    return (
      data?.[0] || {
        accepted_total: 0,
        cooperation_total: 0,
        delay_total: 0,
        dispatch_total: 0,
        finished_total: 0,
        in_progress_total: 0,
        personal_total: 0,
        total: 0,
        unfinished_total: 0
      }
    )
  }

  query(params: FilterParamsProps) {
    console.log('@query', params)

    yieldConsole({ type: 'query-start', data: params })

    try {
      const timestamp = dayjs().startOf('day').unix() - this.timeDiff

      const sqlTasks = this.db!.exec(
        getFilterSql({ ...params, timestamp, user_id: this.userId })
      )

      const data = (sqlTasks[0] ? this.formatSelectValue(sqlTasks[0]) : []).map(
        (i) =>
          ({
            ...i,
            application_id:
              i['application_id'] === '0' ? null : i['application_id'],
            flow_step_id: i['flow_step_id'] === '0' ? null : i['flow_step_id'],
            project_id: i['project_id'] === '0' ? null : i['project_id']
          } as any)
      )

      for (const line of data) {
        const task_id = line['task_id']
        const repeat_id = line['repeat_id']

        const sqlTakers = this.db!.exec(QueryTaskTakersSQL(task_id, repeat_id))

        const sqlChildTotal = this.db!.exec(QueryTaskChildTotal(this.userId))

        const totalBack = sqlChildTotal[0]
          ? this.formatSelectValue(sqlChildTotal[0])[0]
          : {}

        Object.assign(line, {
          task_tree_total: totalBack['task_tree_total'],
          task_tree_complete_total: totalBack['task_tree_complete_total'],
          interact_process: {
            child_total: line['child_total'],
            comment_total: line['comment_total'],
            file_total: line['file_total'],
            gadget_meeting_total: line['gadget_meeting_total'],
            gadget_todo_total: line['gadget_todo_total'],
            important_total: line['important_total'],
            quote_total: line['quote_total']
          }
        })

        line['takers'] = sqlTakers[0]
          ? this.formatSelectValue(sqlTakers[0])
          : []
      }

      yieldConsole({ type: 'query-end', data: params })

      if (params.direction === Direction.up) {
        const old = JSON.parse(JSON.stringify(data))

        const back = data.reverse()

        console.log(
          'Reverse Before',
          old,
          'Reverser After',
          JSON.parse(JSON.stringify(back))
        )

        return back
      }

      return data
    } catch (e) {
      yieldConsole({
        type: 'error',
        data: {
          type: 'query',
          params,
          ...parseError(e)
        }
      })

      return []
    }
  }

  private async fetchZip(url: string) {
    this.zipObj = await ZipUtils.init(url)
  }

  private async parseFile(filename: string) {
    return JSON.parse(await this.zipObj.file(filename).async('string'))
  }

  // 将全量包的内容写入数据库
  private async updateTable(isDiff: boolean) {
    yieldConsole({
      type: 'update-table-start'
    })

    const guide = await this.parseFile('guide')

    for (const [table, info] of Object.entries(guide)) {
      const { data } = info as { data: string[] }

      for (const file of data) {
        const content = (await this.parseFile(file)) as any[]

        // let sqlStr = ''

        content.forEach((item) => {
          try {
            if (isDiff) {
              const { type, data, keys } = item

              this.db!.run(this.getDelSql(keys, table) + ';')

              if (type === 'delete') {
                // 一定会先删除数据, 此处不处理
              } else {
                this.db!.run(this.getInsertSql(data, table) + ';')
              }

              return
            }

            // sqlStr += this.getInsertSql(item, table) + ';'

            this.db!.run(this.getInsertSql(item, table) + ';')
          } catch (e) {
            yieldConsole({
              type: 'error',
              data: {
                ...parseError(e),
                item,
                table,
                type: 'writting-diff-update'
              }
            })
          }
        })

        // this.db!.run(sqlStr)
      }
    }

    this.updateDB()

    yieldConsole({ type: 'update-table-end' })
  }

  private updateDB() {
    set(this.dbId, this.db!.export()).then(() => {
      console.log('output -->')

      // record the timestamp
      set(this.recordKey, this.recordInfo)
    })
  }

  private getDecentItem(
    item: Record<string, any>,
    table: string,
    options?: { isUpdate?: boolean }
  ) {
    const obj: any = {}

    if (options?.isUpdate) {
      Object.keys(item).forEach((k) => {
        if (k in defaultInfo[table]) {
          obj[k] = item[k]
        }
      })
    } else {
      Object.keys(defaultInfo[table]).forEach((k) => {
        obj[k] = item[k] || defaultInfo[table][k]
      })
    }

    return obj
  }

  private getSqlValue(v: any) {
    if (typeof v === 'number') {
      return v
    }

    if (typeof v === 'string') {
      return `'${(v as string).replace(/'/g, `''`)}'`
    }

    if (v && typeof v === 'object') {
      return `'${JSON.stringify(v)}'`
    }

    return v || 'null'
  }

  private getKeyLinkValue([key, value]: [string, any]) {
    return '`' + key + '`' + '=' + this.getSqlValue(value)
  }

  private getDelSql(keys: Record<string, any>, table: string) {
    const where = Object.entries(keys).map((item) => this.getKeyLinkValue(item))

    return `DELETE FROM ${table} WHERE ${where.join(' AND ')}`
  }

  private getUpdateSql(
    item: { keys: Record<string, any>; data: Record<string, any> },
    table: string
  ) {
    const data = this.getDecentItem(item.data, table, { isUpdate: true })

    const set = Object.entries(data).map((v) => this.getKeyLinkValue(v))

    const where = Object.entries(item.keys).map((v) => this.getKeyLinkValue(v))

    return `UPDATE ${table} SET ${set.join(',')} WHERE ${where.join(' AND ')}`
  }

  private getInsertSql(_item: Record<string, any>, table: string) {
    const item = this.getDecentItem(_item, table)

    const singleSql = `INSERT OR REPLACE INTO ${table} (${Object.keys(
      item
    ).join(' ,')}) VALUES (${Object.values(item)
      .map((i) => {
        if (typeof i === 'number') {
          return i
        }

        if (typeof i === 'string') {
          return `'${(i as string).replace(/'/g, `''`)}'`
        }

        if (i && typeof i === 'object') {
          return `'${JSON.stringify(i)}'`
        }

        return i || 'null'
      })
      .join(' ,')})`

    return singleSql
  }
}

export const sqlStore = new SqlStore()

export type ISqlStore = SqlStore
