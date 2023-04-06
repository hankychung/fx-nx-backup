import { sqlStore } from '@flyele-nx/sql-store'
import { PostData, ServiceWorkerKey } from '@flyele-nx/sw-sql-client'

class DBHandler {
  constructor() {
    self.onmessage = async ({ data }: MessageEvent<PostData>) => {
      console.log('from client', data, data.data)
      let responseData: any = null

      console.log('onmessage')
      switch (data.key) {
        case ServiceWorkerKey.INIT_DB: {
          await sqlStore.initDB(data.data as any)
          break
        }
        case ServiceWorkerKey.QUERY_FULL_VIEW_LIST: {
          responseData = sqlStore.query(data.data as any)
          break
        }
        case ServiceWorkerKey.UPDATE_TOKEN: {
          sqlStore.updateToken(data.data as string)
          break
        }
      }

      self.postMessage({ uid: data.uid, data: responseData })
    }
  }
}

new DBHandler()
