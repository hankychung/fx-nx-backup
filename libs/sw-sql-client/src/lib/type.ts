import { DayViewParamsProps, SqlStore } from '@flyele-nx/sql-store'

export type FilterKeys = keyof SqlStore.Filter.FilterParamsFilter

export enum NotParamsWorkerKey {
  QUERY_FULL_VIEW_COUNT = 'QUERY_FULL_VIEW_COUNT',
  CONSOLE = 'CONSOLE',
  UPDATE_DIFF = 'UPDATE_DIFF'
}

export enum ServiceWorkerKey {
  QUERY_FULL_VIEW_LIST = 'QUERY_FULL_VIEW_LIST',
  INIT_DB = 'INIT_DB',
  UPDATE_TOKEN = 'UPDATE_TOKEN',
  DAY_VIEW = 'DAY_VIEW',
  IS_READY = 'IS_READY',
  QUERY_DIFF_FULL = 'QUERY_DIFF_FULL'
}

export type ServiceWorkerParams = {
  [ServiceWorkerKey.QUERY_FULL_VIEW_LIST]: SqlStore.Filter.FilterParamsProps
  [ServiceWorkerKey.INIT_DB]: SqlStore.IUserParams
  [ServiceWorkerKey.UPDATE_TOKEN]: string
  [ServiceWorkerKey.DAY_VIEW]: DayViewParamsProps
  [ServiceWorkerKey.IS_READY]: null
  [ServiceWorkerKey.QUERY_DIFF_FULL]: {
    mode: 1 | 2
    diffInfo: {
      taskIds: string[]
      parentIds: string[]
    }
  }
}

export type ServiceWorkerData = {
  [ServiceWorkerKey.INIT_DB]: void
  [ServiceWorkerKey.QUERY_FULL_VIEW_LIST]: []
  [NotParamsWorkerKey.QUERY_FULL_VIEW_COUNT]: SqlStore.IQueryFullViewCountRes
  [ServiceWorkerKey.UPDATE_TOKEN]: void
  [NotParamsWorkerKey.UPDATE_DIFF]: {
    taskIds: string[]
    parentIds: string[]
  }
  [NotParamsWorkerKey.CONSOLE]: {
    type: string
    data: any
  }
  [ServiceWorkerKey.DAY_VIEW]: any[]
  [ServiceWorkerKey.IS_READY]: boolean
  [ServiceWorkerKey.QUERY_DIFF_FULL]: {
    taskIds: string[]
    parentIds: string[]
    list: any[]
  }
}

export interface PostData {
  uid: string
  key: ServiceWorkerKey & NotParamsWorkerKey
  data?: ServiceWorkerParams[ServiceWorkerKey]
}

export type WorkerBack<T> = {
  uid: string
  code: number
  data: T
}
