import { sqlStore } from '@flyele-nx/sql-store'
import { INIT_DB } from '@flyele-nx/sw-sql-client'

class DBHandler {
  constructor() {
    self.onmessage = ({ data }: any) => {
      console.log('from client', data)

      if (INIT_DB in data) {
        sqlStore.initDB(data[INIT_DB]).then((res) => {
          self.postMessage({ initData: res })
        })
      }
    }
  }
}

new DBHandler()
