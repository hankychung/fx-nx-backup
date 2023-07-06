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
console.log(self, 'nxnxnx****的self')

self.JsDataZeusDb = JsDataZeusDb

export default JsDataZeusDb
