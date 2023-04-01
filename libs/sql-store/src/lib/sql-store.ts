import initSql from 'sql.js'
import { createSql } from './sql/create'
import { ZipUtils } from './zip'
import { defaultInfo } from './const/defaultInfo'
import { set, get, del } from 'idb-keyval'
import dayjs from 'dayjs'
import { BaseQuerySql } from './sql/query'
import { jsonKey, boolKey } from './const'
import { getFilterSql } from './utils/filter'
import { Direction, FilterParamsProps } from './type/filter'
import { QueryTaskTakersSQL } from './sql/query'
import { PackInfo } from './type/service/datapandora'

const wasmUrl = '/sql-wasm.wasm'

interface IUserParams {
  token: string
  host: string
  env: string
  userId: string
}

type RecordInfo = Pick<PackInfo['data'][0], 'id' | 'attach_info'>

type DiffPackList = PackInfo['data']

class SqlStore {
  private db: initSql.Database | null = null

  private zipObj: any = null

  private timeDiff = 0

  private host = 'https://api.flyele.vip'

  private userId = ''

  private recordInfo: RecordInfo | null = null

  private dbId = ''

  private recordKey = ''

  async initDB(p: IUserParams) {
    this.userId = p.userId

    // 已存在打开的数据库（切换用户）
    if (this.db) {
      this.db.close()
      this.db = null
    }

    this.dbId = `${p.env}-${p.userId}`

    this.recordKey = `${this.dbId}-record`

    this.host = p.host

    const SQL = await initSql({
      locateFile: () => wasmUrl
    })

    const data = await (await fetch(`${this.host}/userc/v2/system/now`)).json()

    if (data.data) {
      this.timeDiff = Math.floor(Date.now() / 1000) - data.data
    }

    // 从indexeddb获取数据库
    const storeDB = await get(this.dbId)

    // 从indexeddb获取更新信息
    this.recordInfo = (await get(this.recordKey)) as RecordInfo | null

    // 获取用户的初始化数据
    const list = await this.getUserData(p)

    const firstData = list[0]

    if (firstData && firstData.type === 1) {
      // 存在全量包, 需要重新建表
      const db = new SQL.Database()

      this.db = db

      db.run(createSql)

      const { sign_url, id, attach_info } = firstData

      await this.fetchZip(sign_url)

      this.recordInfo = { id, attach_info }

      await this.initTable()
    } else {
      if (storeDB) {
        // 存在用户数据库
        this.db = new SQL.Database(storeDB)
      } else {
        // 不存在用户数据库, 从indexeddb清除recordKey重新请求
        await del(this.recordKey)
        await this.initDB(p)
        return
      }
    }

    // 更新差异包
    this.updateDiffData(list.filter(({ type }) => type === 2))
  }

  private updateDiffData(p: DiffPackList) {
    console.log('diff packs', p)
  }

  private async getUserData(info: IUserParams) {
    const lastId = this.recordInfo?.id || 0

    const data = (await (
      await fetch(
        `${this.host}/datapandora/v1/packinfo/get?last_id=${lastId}`,
        {
          headers: {
            Authorization: info.token
          }
        }
      )
    ).json()) as PackInfo

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

  query(params: FilterParamsProps) {
    const timestamp = dayjs().startOf('day').unix() - this.timeDiff

    const sqlTasks = this.db!.exec(getFilterSql({ ...params, timestamp }))

    const data = sqlTasks[0] ? this.formatSelectValue(sqlTasks[0]) : []

    for (const line of data) {
      const sqlTakers = this.db!.exec(QueryTaskTakersSQL(line['task_id']))

      line['takers'] = sqlTakers[0] ? this.formatSelectValue(sqlTakers[0]) : []
    }

    if (params.direction === Direction.up) {
      return data.reverse()
    }

    return data
  }

  private async fetchZip(url: string) {
    this.zipObj = await ZipUtils.init(url)
  }

  private async parseFile(filename: string) {
    return JSON.parse(await this.zipObj.file(filename).async('string'))
  }

  private async initTable() {
    const guide = await this.parseFile('guide')

    for (const [table, info] of Object.entries(guide)) {
      const { data } = info as { data: string[] }

      for (const file of data) {
        const content = (await this.parseFile(file)) as any[]

        const decentCtn = content.map((i) => {
          const obj: any = {}

          Object.keys(defaultInfo[table]).forEach((k) => {
            obj[k] = i[k] || defaultInfo[table][k]
          })

          return obj
        })

        let sqlStr = ''

        decentCtn.forEach((item) => {
          sqlStr += this.getInsertSql(item, table) + ';'
        })

        this.db!.run(sqlStr)
      }
    }

    this.updateDB()
  }

  private updateDB() {
    set(this.dbId, this.db!.export()).then(() => {
      console.log('output -->')

      // record the timestamp
      set(this.recordKey, this.recordInfo)
    })
  }

  private getInsertSql(item: Record<string, any>, table: string) {
    const singleSql = `INSERT INTO ${table} (${Object.keys(item).join(
      ' ,'
    )}) VALUES (${Object.values(item)
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
