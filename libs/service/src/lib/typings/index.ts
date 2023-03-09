export interface IErrorResponse {
  code: number
  dbg_error: string
  message: string
}

export type IResponse<T> = {
  data: T
  code: number
}

export type RequestConfig = import('axios').AxiosRequestConfig & { url: string }

export interface IUserInfo {
  Token: string
  create_at: number
  avatar: string
  nick_name: string
  original_name: string
  telephone: string
  user_id: string
  pinyin: string
}
