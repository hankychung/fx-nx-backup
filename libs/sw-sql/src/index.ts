import { sqlStore } from '@flyele-nx/sql-store'
import { PostData, ServiceWorkerKey } from '@flyele-nx/sw-sql-client'

class DBHandler {
  constructor() {
    self.onmessage = async ({ data }: MessageEvent<PostData>) => {
      console.log('from client', data, data.data)

      let responseData: any = null

      switch (data.key) {
        case ServiceWorkerKey.INIT_DB: {
          await sqlStore.initDB(data.data as any)

          break
        }

        case ServiceWorkerKey.UPDATE_TOKEN: {
          sqlStore.updateToken(data.data as string)

          responseData = undefined

          break
        }
      }

      self.postMessage({ uid: data.uid, data: responseData })
    }
  }
}

new DBHandler()
