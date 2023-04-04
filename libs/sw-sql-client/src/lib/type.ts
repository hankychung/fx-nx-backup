import { SqlStore } from '@flyele-nx/sql-store'

export enum NotParamsWorkerKey {
  FAKE = 'FAKE'
}

export enum ServiceWorkerKey {
  QUERY_FULL_VIEW_LIST = 'QUERY_FULL_VIEW_LIST',
  INIT_DB = 'INIT_DB'
}

export type ServiceWorkerParams = {
  [ServiceWorkerKey.QUERY_FULL_VIEW_LIST]: { page_number: number }
  [ServiceWorkerKey.INIT_DB]: SqlStore.IUserParams
}

export type ServiceWorkerData = {
  [ServiceWorkerKey.INIT_DB]: undefined
  [ServiceWorkerKey.QUERY_FULL_VIEW_LIST]: []
  [NotParamsWorkerKey.FAKE]: undefined
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
