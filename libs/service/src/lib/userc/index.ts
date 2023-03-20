import * as dayjs from 'dayjs'
import { uid } from '@flyele-nx/utils'
import { service } from '../service'
import { IUserInfo, ILoginKeyParams, CommonResponse } from '../typings'
import { AxiosRequestConfig } from 'axios'

class Userc {
  private prefix = 'userc/v2'

  async phoneLogin(phone?: number) {
    const res = await service.put<IUserInfo>({
      url: `${this.prefix}/auth/phonelogin/code`,
      data: {
        telephone: phone || '13650939928',
        verify_code: '123456',
        device: {
          client_version: 'fake',
          device_id: 'fake',
          device_name: 'fake',
          os: 'fake',
          platform: 'web'
        }
      }
    })

    console.log('res', res.telephone, res)
  }

  async getCurrentDate() {
    try {
      const res = await service.get<number>({
        url: `${this.prefix}/system/now`,
        timeout: 3000
      })

      console.log('check time', res)

      return res
    } catch (e) {
      console.error('获取服务器时间戳失败', dayjs().unix(), e)
      return dayjs().unix()
    }
  }

  async getLoginKey(
    data: ILoginKeyParams,
    headers: AxiosRequestConfig['headers'] = {}
  ) {
    return await service.post({
      url: `${this.prefix}/auth/scanlogin/code`,
      data,
      timeout: 20000,
      headers
    })
  }

  async updateUid() {
    const data = {
      device_id: uid,
      platform: 'pc'
    }

    return await service.put({
      url: `${this.prefix}/user/device`,
      data
    })
  }

  async getLoginUserInfo() {
    return await service.get<CommonResponse<IUserInfo>>({
      url: '/user',
      timeout: 20000
    })
  }
}

export const UsercApi = new Userc()
