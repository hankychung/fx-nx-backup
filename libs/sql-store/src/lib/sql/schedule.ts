import { sqlStore } from '../sql-store'

declare global {
  interface Window {
    JsDataZeusDb: any
  }
}

class JsDataZeusDb {
  query = (sql: string) => {
    return sqlStore.querySchedule(sql)
  }

  execute = (sql: string) => {
    return sqlStore.executeSchedule(sql)
  }
}

self.JsDataZeusDb = JsDataZeusDb
console.log(self, 'nxnxnx****的self')
export default JsDataZeusDb
