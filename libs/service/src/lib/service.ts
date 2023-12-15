import axios, { AxiosInstance, AxiosError } from 'axios'
import { IErrorResponse, RequestConfig, IResponse } from './typings'
import { envStore } from './env'
import { LocalStore } from '@flyele-nx/utils'

class Service {
  axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      headers: {},
      timeout: 60000
    })
    this.requestInterceptors()
    this.responseInterceptors()
  }

  token =
    LocalStore.getToken() ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDI2Mjk5MTQsImlhdCI6MTcwMjYyMTY4NCwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIyNDg4MzY3MjIwNzg1MjY4IiwiRGV2aWNlSUQiOiIzOGVjYmM4OGYwZmVlOTZjODE1ZjRiZTgwY2RkNmMxNjYwZjM2Y2NiZjI0ZTYwMTg1MjNmMmZkZDk5MDU2MmUyIiwiUGxhdGZvcm0iOiJtb2JpbGUiLCJDbGllbnRWZXJzaW9uIjoiMi4zMC4xMCIsIlBob25lIjoiIiwiTmlja05hbWUiOiIiLCJBdmF0YXIiOiIifQ.S0g0KA_T1xEQppxuEp0JeKFlaM353xnjaw6amiHPaEI'
  /**
   * token失效
   */
  tokenInvalid() {
    // tokenInvalid失效，使用到的就在自己项目里面覆盖它
    console.log('token失效')
    // 清除 localstorage 的token
    LocalStore.updateToken('')
  }

  private requestInterceptors() {
    this.axios.interceptors.request.use(
      (config) => {
        // before request is sent
        config.headers.Authorization = this.token

        if (!envStore.IsNxDev()) {
          config.headers['X-Auth-Timezone'] =
            -new Date().getTimezoneOffset() / 60

          config.headers['X-Auth-Language'] = (global as any).lang.split(
            '-'
          )[0] as string

          config.headers['X-Auth-Area'] =
            (global as any).lang === 'zh-CN' ? 0 : 1
        }

        if (config.data && config.data.NxBaseUrl) {
          config.baseURL = config.data.NxBaseUrl
          delete config.data.NxBaseUrl
        } else {
          config.baseURL = envStore.getHost()
        }

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
          this.tokenInvalid && this.tokenInvalid()
        }

        return Promise.reject(err)
      }
    )
  }

  updateToken(token: string) {
    // console.log('token changing', token)
    this.token = token

    LocalStore.updateToken(token)
  }

  getToken(): string {
    return this.token
  }

  async put<T>(config: RequestConfig) {
    const { data } = await this.axios.put<IResponse<T>>(config.url, config.data)

    if (!data.code) {
      return data
    }

    throw new Error(`error: ${config.url}`)
  }

  async get<T, M = Record<string, never>>(
    config: RequestConfig
  ): Promise<IResponse<T, M>> {
    const { data } = await this.axios.get<IResponse<T, M>>(
      `${config.url}`,
      config
    )

    if (!data.code) {
      return data
    }

    throw new Error(`error get: ${config.url}`)
  }

  async getRaw<T>(config: RequestConfig): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(`${config.url}`, config)

      return data
    } catch (err) {
      console.error('getRaw error', err)
      throw new Error(`error get: ${config.url}`)
    }
  }

  async post<T = any>(config: RequestConfig): Promise<T> {
    const { data } = await this.axios.post(`${config.url}`, config.data)

    if (!data.code) {
      return data
    }

    throw new Error(`error post: ${config.url}`)
  }

  async delete<T>(config: RequestConfig) {
    const { data } = await this.axios.delete<IResponse<T>>(
      config.url,
      config.data
    )

    if (!data.code) {
      return data
    }

    throw new Error(`error: ${config.url}`)
  }
}

export const service = new Service()
