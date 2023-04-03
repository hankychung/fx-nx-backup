import { sqlStore } from '@flyele-nx/sql-store'
import {
  INIT_DB,
  NotParamsWorkerKey,
  PostData,
  ServiceWorkerData
} from '@flyele-nx/sw-sql-client'

class DBHandler {
  constructor() {
    self.onmessage = ({ data }: MessageEvent<PostData>) => {
      console.log('from client', data)

      switch (data.key) {
        case NotParamsWorkerKey.INIT_DB: {
          sqlStore.initDB({} as unknown as any).then(() => {
            self.postMessage({ uid: data.uid })
          })
        }
      }
    }
  }
}

new DBHandler()
