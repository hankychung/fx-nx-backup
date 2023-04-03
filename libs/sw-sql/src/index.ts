import { sqlStore } from '@flyele-nx/sql-store'
import { PostData, ServiceWorkerKey } from '@flyele-nx/sw-sql-client'

class DBHandler {
  constructor() {
    self.onmessage = ({ data }: MessageEvent<PostData>) => {
      console.log('from client', data, data.data)

      console.log('onmessage')
      switch (data.key) {
        case ServiceWorkerKey.INIT_DB: {
          sqlStore.initDB(data.data as any).then(() => {
            self.postMessage({ uid: data.uid })
          })
        }
      }
    }
  }
}

new DBHandler()
