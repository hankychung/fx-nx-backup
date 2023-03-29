// eslint-disable-next-line
const initSql = require('sql.js')
import { createSql } from './sql/create'
import { ZipUtils } from './zip'
import { defaultInfo } from './const/defaultInfo'
// eslint-disable-next-line
//@ts-ignore
import { set, get } from 'idb-keyval'
import * as dayjs from 'dayjs'
import { BaseQuerySql } from './sql/query'
import { jsonKey } from './const'
import { getFilterSql } from './utils/filter'
import { Direction, FilterParamsProps } from './type/filter'

const userInfo =
  'http://flyele-dev.oss-cn-shenzhen.aliyuncs.com/middlestation%2F1097162630889616%2F1487318895218688.zip?Expires=1680157153&OSSAccessKeyId=LTAI5tNRFh75VpujzNxcSMxq&Signature=drhJj8F0LoIDe7I%2Fo8rnimBMBYw%3D'

const wasmUrl =
  process.env['NODE_ENV'] === 'dev'
    ? 'https://sql.js.org/dist/sql-wasm.wasm'
    : 'https://cdn.flyele.net/wasm/sql-wasm.wasm'

class SqlStore {
  private db: any = null

  private zipObj: any = null

  private timeDiff = 0

  async initDB() {
    const SQL = await initSql({
      locateFile: () => wasmUrl
    })

    const data = await (
      await fetch('https://api.feixiang.cn/userc/v2/system/now')
    ).json()

    if (data.data) {
      this.timeDiff = Math.floor(Date.now() / 1000) - data.data
    }

    const storeDB = await get('database-fly')

    if (storeDB) {
      this.db = new SQL.Database(storeDB)

      return
    }

    const db = new SQL.Database()

    this.db = db

    db.run(createSql)

    await this.fetchZip(userInfo)

    await this.initTable()

    this.getTable()
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

    const sql = getFilterSql({ ...params, timestamp })

    const stmt = this.db.exec(sql)

    const data = stmt[0] ? this.formatSelectValue(stmt[0]) : []

    if (params.direction === Direction.up) {
      return data.reverse()
    }

    return data
  }

  getTable() {
    const stmt = this.db.exec('SELECT * FROM tag_bind')

    return stmt
  }

  private async fetchZip(url: string) {
    this.zipObj = await ZipUtils.init(url)
  }

  private async parseFile(filename: string) {
    return JSON.parse(await this.zipObj.file(filename).async('string'))
  }

  private async initTable() {
    console.log('begin')
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

        this.db.run(sqlStr)
      }
    }

    console.log('done')

    set('database-fly', this.db.export()).then(() => {
      console.log('output -->')
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
