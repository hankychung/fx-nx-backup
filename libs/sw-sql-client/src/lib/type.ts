import { SqlStore } from '@flyele-nx/sql-store'

export type FilterKeys = keyof SqlStore.Filter.FilterParamsFilter

export enum NotParamsWorkerKey {
  QUERY_FULL_VIEW_COUNT = 'QUERY_FULL_VIEW_COUNT',
  CONSOLE = 'CONSOLE'
}

export enum ServiceWorkerKey {
  QUERY_FULL_VIEW_LIST = 'QUERY_FULL_VIEW_LIST',
  INIT_DB = 'INIT_DB',
  UPDATE_TOKEN = 'UPDATE_TOKEN',
  UPDATE_DIFF = 'UPDATE_DIFF'
}

export type ServiceWorkerParams = {
  [ServiceWorkerKey.QUERY_FULL_VIEW_LIST]: SqlStore.Filter.FilterParamsProps
  [ServiceWorkerKey.INIT_DB]: SqlStore.IUserParams
  [ServiceWorkerKey.UPDATE_TOKEN]: string
  [ServiceWorkerKey.UPDATE_DIFF]: {
    mode: 1 | 2
  }
}

export type ServiceWorkerData = {
  [ServiceWorkerKey.INIT_DB]: void
  [ServiceWorkerKey.QUERY_FULL_VIEW_LIST]: []
  [NotParamsWorkerKey.QUERY_FULL_VIEW_COUNT]: SqlStore.IQueryFullViewCountRes
  [ServiceWorkerKey.UPDATE_TOKEN]: void
  [ServiceWorkerKey.UPDATE_DIFF]: {
    taskIds: string[]
    parentIds: string[]
    list: any[]
  }
  [NotParamsWorkerKey.CONSOLE]: {
    type: string
    data: any
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
