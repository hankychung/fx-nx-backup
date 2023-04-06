import { SqlStore } from '@flyele-nx/sql-store'

export type FilterKeys = keyof SqlStore.Filter.FilterParamsFilter

export enum NotParamsWorkerKey {
  FAKE = 'FAKE'
}

export enum ServiceWorkerKey {
  QUERY_FULL_VIEW_LIST = 'QUERY_FULL_VIEW_LIST',
  INIT_DB = 'INIT_DB',
  UPDATE_TOKEN = 'UPDATE_TOKEN'
}

export type ServiceWorkerParams = {
  [ServiceWorkerKey.QUERY_FULL_VIEW_LIST]: SqlStore.Filter.FilterParamsProps
  [ServiceWorkerKey.INIT_DB]: SqlStore.IUserParams
  [ServiceWorkerKey.UPDATE_TOKEN]: string
}

export type ServiceWorkerData = {
  [ServiceWorkerKey.INIT_DB]: undefined
  [ServiceWorkerKey.QUERY_FULL_VIEW_LIST]: []
  [NotParamsWorkerKey.FAKE]: undefined
  [ServiceWorkerKey.UPDATE_TOKEN]: void
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
