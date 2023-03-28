// eslint-disable-next-line
const initSql = require('sql.js')
import { createSql } from './sql/create'
import { ZipUtils } from './zip'
import { defaultInfo } from './const/defaultInfo'

const userInfo =
  'http://flyele-dev.oss-cn-shenzhen.aliyuncs.com/middlestation%2F1097162630889616%2F1487318895218688.zip?Expires=1680157153&OSSAccessKeyId=LTAI5tNRFh75VpujzNxcSMxq&Signature=drhJj8F0LoIDe7I%2Fo8rnimBMBYw%3D'

const wasmUrl =
  process.env['NODE_ENV'] === 'dev'
    ? 'https://sql.js.org/dist/sql-wasm.wasm'
    : 'https://cdn.flyele.net/wasm/sql-wasm.wasm'

class SqlStore {
  private db: any = null

  private zipObj: any = null

  async initDB() {
    const SQL = await initSql({
      locateFile: () => wasmUrl
    })

    const db = new SQL.Database()

    this.db = db

    db.run(createSql)

    await this.fetchZip(userInfo)

    await this.readGuideAndInsertInfo()

    this.getTable()
  }

  getTable() {
    const stmt = this.db.exec('SELECT * FROM tag_bind')

    console.log(stmt)
  }

  private async fetchZip(url: string) {
    this.zipObj = await ZipUtils.init(url)
  }

  private async parseFile(filename: string) {
    return JSON.parse(await this.zipObj.file(filename).async('string'))
  }

  private async readGuideAndInsertInfo() {
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
  }

  private getInsertSql(item: Record<any, any>, table: string) {
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

sqlStore.initDB()
