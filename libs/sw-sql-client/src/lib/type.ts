export enum NotParamsWorkerKey {
  INIT_DB = 'INIT_DB'
}

export enum ServiceWorkerKey {
  QUERY_FULL_VIEW_LIST = 'QUERY_FULL_VIEW_LIST'
}

export type ServiceWorkerParams = {
  [ServiceWorkerKey.QUERY_FULL_VIEW_LIST]: { page_number: number }
}

export type ServiceWorkerData = {
  [NotParamsWorkerKey.INIT_DB]: undefined
  [ServiceWorkerKey.QUERY_FULL_VIEW_LIST]: []
}

export interface PostData {
  uid: string
  key: ServiceWorkerKey & NotParamsWorkerKey
  params?: ServiceWorkerParams[ServiceWorkerKey]
}

export type WorkerBack<T> = {
  uid: string
  code: number
  data: T
}
