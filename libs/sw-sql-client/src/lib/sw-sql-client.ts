import {
  NotParamsWorkerKey,
  ServiceWorkerData,
  ServiceWorkerKey,
  ServiceWorkerParams,
  WorkerBack
} from './type'

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

      if (code !== 0) {
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

const registerServiceWorker = async (url: string) => {
  if (!('serviceWorker' in navigator)) {
    console.error('serviceWorker is not supported')
    return
  }

  serviceWorker = new Worker(url)

  return promiseWorkerMessage(NotParamsWorkerKey.INIT_DB)
}

/**
 * 查询全量列表
 * @param params any //TODO 需要替换成实际类型
 * @returns
 */
const queryFullViewList = (data: any) => {
  return promiseWorkerMessage(ServiceWorkerKey.QUERY_FULL_VIEW_LIST, {
    page_number: 1
  })
}

export { registerServiceWorker, queryFullViewList }
