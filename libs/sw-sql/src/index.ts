import { ISqlStore } from '@flyele-nx/sql-store'
import { sqlStore } from '@flyele-nx/sql-store'

class DBHandler {
  private sqlStore: ISqlStore | null = null

  constructor() {
    self.onmessage = ({ data }: any) => {
      console.log('from client', data)

      if (data.initSql) {
        const sqlStore = data.initSql as ISqlStore

        console.log('check this', this)

        this.initDB(sqlStore)

        this.sqlStore = sqlStore
      }
    }

    sqlStore.initDB().then((res) => {
      console.log('data from worker!!', res)
    })
  }

  initDB(sqlStore: ISqlStore) {
    console.log('check store', sqlStore)

    sqlStore.initDB().then((res) => {
      self.postMessage({ initData: res })
    })
  }
}

new DBHandler()
