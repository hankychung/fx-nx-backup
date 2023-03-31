import { sqlStore } from '@flyele-nx/sql-store'
import { INIT_DB } from '@flyele-nx/sw-sql-client'

class DBHandler {
  constructor() {
    self.onmessage = ({ data }: any) => {
      console.log('from client', data)

      if (data === INIT_DB) {
        this.initDB()
      }
    }
  }

  initDB() {
    sqlStore.initDB().then((res) => {
      self.postMessage({ initData: res })
    })
  }
}

new DBHandler()
