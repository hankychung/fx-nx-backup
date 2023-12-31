/**
 * 获取对象某个key的值类型
 */
export type GetObjKeyOfType<T, K extends keyof T> = Required<
  Pick<T, K>
> extends {
  [p in T extends K ? K : string]: infer U
}
  ? U
  : never

export interface CommonResponse<T> {
  code?: number
  message?: string
  data: T
}

export interface IExternalListResponse {
  total?: number
  complete_total?: number
}

export interface CommonListResponse<T> extends CommonResponse<T> {
  total?: number
  complete_total?: number
}

// type ENV = 'normal' | 'dev' | 'test' | 'prod' | 'pre_prod' | 'pre_release'

export interface IErrorResponse {
  code: number
  dbg_error: string
  message: string
}

export type IResponse<T, M = Record<string, never>> = CommonResponse<T> & M

export type RequestConfig = import('axios').AxiosRequestConfig & {
  url: string
} & { notFilterEmpty?: boolean }

export interface IRequestList {
  page_number?: number // 查询页数，默认1
  page_record?: number // 查询条数，默认20
}

export interface ISize {
  w: number
  h: number
}

// 事项 项目 飞项小姐姐  vip消息  空间消息
export type RefType =
  | 'task'
  | 'project'
  | 'private_chat'
  | 'member'
  | 'record'
  | 'workspace'
  | 'target' // 目标 前端用
  | 'objective' // 目标
  | 'screen' // 视图
  | 'flyele' //讨论
