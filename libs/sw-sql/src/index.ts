import { sqlStore } from '@flyele-nx/sql-store'
import {
  PostData,
  ServiceWorkerKey,
  NotParamsWorkerKey
} from '@flyele-nx/sw-sql-client'

type DiffFullInfo = {
  mode: 1 | 2
  diffInfo: {
    taskIds: string[]
    parentIds: string[]
  }
}

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

        case ServiceWorkerKey.QUERY_DIFF_FULL: {
          const res = data.data as DiffFullInfo

          console.log('全量实时更新', data)

          const { mode, diffInfo } = res

          responseData = {
            ...diffInfo,
            list: await sqlStore.query({
              show_model: mode,
              filter: {
                task_ids: diffInfo.taskIds
              }
            })
          }

          break
        }

        case NotParamsWorkerKey.UPDATE_DIFF: {
          responseData = await sqlStore.updateDiffForClient()
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
