import { FullViewParams } from './full-view-type'
import {
  NotParamsWorkerKey,
  ServiceWorkerData,
  ServiceWorkerKey,
  ServiceWorkerParams,
  WorkerBack
} from './type'
import { DayViewParamsProps, SqlStore } from '@flyele-nx/sql-store'

import { Direction, FilterParamsProps } from '@flyele-nx/sql-store'
import { SqlFilterSplitKeys, SqlFilterTimerkeys } from './const'

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
    try {
      if (!serviceWorker) {
        return reject('ERROR, serviceWorker is not init')
      }

      console.log('promiseWorkerMessage', serviceWorker)

      const postUid = `${key}-${String(Math.floor(Math.random() * 100000000))}`

      const callBack = ({ data: res }: MessageEvent<WorkerBack<res>>) => {
        const { code, uid, data } = res

        if (uid !== postUid) return

        console.log('client get ->', res)

        serviceWorker?.removeEventListener('message', callBack)

        if (code) {
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
    } catch (e) {
      console.error('promiseWorkerMessage', e)
      reject(e)
    }
  })
}

class ServiceWorkerUtils {
  static async registerServiceWorker(
    url: string,
    options?: {
      consoleCollector?: (info: {
        type: string
        timestamp: number
        data?: object
      }) => void
    }
  ) {
    if (!('serviceWorker' in navigator)) {
      console.error('serviceWorker is not supported')
      return
    }

    console.log('serviceWorker init')

    serviceWorker = new Worker(url)

    serviceWorker.addEventListener('message', ({ data: { key, info } }) => {
      if (key === 'console') {
        if (options?.consoleCollector) {
          options.consoleCollector(info)
        }
      }
    })

    return serviceWorker
  }

  static login(userInfo: SqlStore.IUserParams) {
    console.log('ServiceWorkerUtils login')
    return promiseWorkerMessage(ServiceWorkerKey.INIT_DB, userInfo)
  }

  static updateToken(token: string) {
    return promiseWorkerMessage(ServiceWorkerKey.UPDATE_TOKEN, token)
  }

  /**
   * 查询全量统计
   * @returns
   */
  static queryFullViewCount = () => {
    console.log('queryFullViewCount')
    return promiseWorkerMessage(NotParamsWorkerKey.QUERY_FULL_VIEW_COUNT)
  }

  /**
   * 查询全量列表
   * @param params any //TODO 需要替换成实际类型
   * @returns
   */
  static queryFullViewList = (data: FullViewParams) => {
    const params: Partial<FilterParamsProps> = {
      page_number: data.page_number,
      page_record: data.page_record,
      show_model: data.show_mode
    }

    const filter: FilterParamsProps['filter'] = {
      ...data
    }

    if (data.date_type === 1) {
      params.direction = Direction.up
    } else if (data.date_type === 2) {
      params.direction = Direction.down
    }

    // 时间筛选
    for (const tO of SqlFilterTimerkeys) {
      const [start, end] = tO.keys

      const start_time = data[
        start as unknown as keyof FullViewParams
      ] as number
      const end_time = data[end as unknown as keyof FullViewParams] as number

      if (!start_time || !end_time) continue

      filter[tO.filter_key] = { start_time, end_time } as never
    }

    // ids之类的拼接字符串处理
    for (const tS of SqlFilterSplitKeys) {
      const { key, filter_key } = tS

      const d = data[key as unknown as keyof FullViewParams] as string

      if (!d) continue

      filter[filter_key] = d.split(',') as never
    }

    params.filter = filter

    if (data.order_by && data.sort) {
      params.order_by = {
        order_by_key: data.order_by,
        sort: data.sort
      }
    }

    console.log('queryFullViewList', params, JSON.stringify(params))

    return promiseWorkerMessage(
      ServiceWorkerKey.QUERY_FULL_VIEW_LIST,
      params as unknown as FilterParamsProps
    )
  }

  // 增量数据更新
  static updateDiff(mode: 1 | 2) {
    return promiseWorkerMessage(ServiceWorkerKey.UPDATE_DIFF, { mode })
  }

  // 按日获取
  static getDayView(params: DayViewParamsProps) {
    return promiseWorkerMessage(ServiceWorkerKey.DAY_VIEW, params)
  }

  // 按日获取
  static getIsReady() {
    return promiseWorkerMessage(ServiceWorkerKey.IS_READY, null)
  }
}

export { ServiceWorkerUtils }
