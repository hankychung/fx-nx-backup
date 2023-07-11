import { sqlStore } from '@flyele-nx/sql-store'
import {
  PostData,
  ServiceWorkerKey,
  NotParamsWorkerKey
} from '@flyele-nx/sw-sql-client'

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
          const checkIsReady = () => sqlStore.isReady

          while (!checkIsReady()) {
            await new Promise((resolve) => {
              setTimeout(resolve, 1000)
            })
          }

          responseData = sqlStore.query(data.data as any)
          break
        }

        case ServiceWorkerKey.UPDATE_TOKEN: {
          sqlStore.updateToken(data.data as string)
          break
        }

        case ServiceWorkerKey.UPDATE_DIFF: {
          responseData = await sqlStore.updateDiffForClient(data.data as any)
          break
        }

        case NotParamsWorkerKey.QUERY_FULL_VIEW_COUNT: {
          responseData = sqlStore.queryFullDoseCount()
          break
        }
        case ServiceWorkerKey.DAY_VIEW: {
          responseData = await sqlStore.getDayView(data.data as any)
          break
        }
      }

      self.postMessage({ uid: data.uid, data: responseData })
    }
  }
}

new DBHandler()
