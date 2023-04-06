import {
  NotParamsWorkerKey,
  ServiceWorkerData,
  ServiceWorkerKey,
  ServiceWorkerParams,
  WorkerBack
} from './type'
import { SqlStore } from '@flyele-nx/sql-store'

let serviceWorker: Worker | undefined

function promiseWorkerMessage<
  k extends NotParamsWorkerKey,
  res extends ServiceWorkerData[k]
>(key: k): Promise<res>
function promiseWorkerMessage<
  k extends ServiceWorkerKey,
  p extends ServiceWorkerParams[k],
  res extends ServiceWorkerData[k]
>(key: k, params: p): Promise<res>
function promiseWorkerMessage<
  k extends ServiceWorkerKey & NotParamsWorkerKey,
  p extends ServiceWorkerParams[k],
  res extends ServiceWorkerData[k]
>(key: k, params?: p): Promise<res> {
  return new Promise<res>((resolve, reject) => {
    if (!serviceWorker) {
      return reject('ERROR, serviceWorker is not init')
    }

    const postUid = `${key}-${String(Math.floor(Math.random() * 100000000))}`

    const callBack = ({ data: res }: MessageEvent<WorkerBack<res>>) => {
      const { code, uid, data } = res

      if (uid !== postUid) return

      console.log('client get ->', res)

      serviceWorker?.removeEventListener('message', callBack)

      if (!code) {
        console.error('Error, PromiseWorkerMessage back error', res)

        return reject(res)
      }

      resolve(data)
    }

    serviceWorker.postMessage({
      uid: postUid,
      key,
      data: params
    })

    serviceWorker.addEventListener('message', callBack)
  })
}

class ServiceWorkerUtils {
  static queryFullViewList(data: any) {
    return promiseWorkerMessage(ServiceWorkerKey.QUERY_FULL_VIEW_LIST, {
      page_number: 1
    })
  }

  static async registerServiceWorker(url: string) {
    if (!('serviceWorker' in navigator)) {
      console.error('serviceWorker is not supported')
      return
    }

    serviceWorker = new Worker(url)
  }

  login(userInfo: SqlStore.IUserParams) {
    return promiseWorkerMessage(ServiceWorkerKey.INIT_DB, userInfo)
  }

  updateToken(token: string) {
    return promiseWorkerMessage(ServiceWorkerKey.UPDATE_TOKEN, token)
  }
}

export { ServiceWorkerUtils }
