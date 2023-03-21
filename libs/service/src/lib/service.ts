import axios, { AxiosInstance, AxiosError } from 'axios'
import { IErrorResponse, RequestConfig, IResponse } from './typings'

class Service {
  axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      baseURL: 'https://api-test.flyele.vip',
      headers: {}
    })
    this.requestInterceptors()
    this.responseInterceptors()
  }

  token = ''

  private requestInterceptors() {
    this.axios.interceptors.request.use(
      (config) => {
        // before request is sent
        config.headers.Authorization = this.token

        return config
      },
      (error) => {
        // request error
        console.error('request error', error)
        return Promise.reject(error)
      }
    )
  }

  private responseInterceptors() {
    this.axios.interceptors.response.use(
      // Any status code that lie within the range of 2xx cause this function to trigger
      (res) => {
        return res
      },
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      (err: AxiosError<IErrorResponse>) => {
        const { response } = err

        // 系统升级中，接口统一返回后错误码
        if (response?.data?.code === 49999) {
          console.error('停服升级中，2个小时后再试')
          // TODO: 全局提示窗体
        }

        // 错误信息
        if (response?.data?.code === 40050 && response?.data?.message) {
          console.error(err.response?.data?.message)
          // TODO: 全局提示窗体
        }

        if (response?.status === 401) {
          // TODO: token失效
        }

        return Promise.reject(err)
      }
    )
  }

  updateToken(token: string) {
    console.log('token changing', token)
    this.token = token
  }

  async put<T>(config: RequestConfig) {
    const { data } = await this.axios.put<IResponse<T>>(config.url, config.data)

    if (!data.code) {
      return data.data
    }

    throw new Error(`error: ${config.url}`)
  }

  async get<T>(config: RequestConfig): Promise<T> {
    const { data } = await this.axios.get<IResponse<T>>(`${config.url}`, config)

    if (!data.code) {
      return data.data
    }

    throw new Error(`error: ${config.url}`)
  }

  async post(config: RequestConfig): Promise<any> {
    const { data } = await this.axios.post(`${config.url}`, config.data)

    return data

    throw new Error(`error: ${config.url}`)
  }
}

export const service = new Service()
