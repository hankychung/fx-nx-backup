import dayjs from 'dayjs'
import { uid } from '@flyele-nx/utils'
import { service } from '../service'
import { IUserInfo, ILoginKeyParams, IVipMember } from '../typings'
import { IContactsAndStatus, EConCheckStatus } from '../typings/taker'
import { AxiosRequestConfig } from 'axios'
import { IMemberApi } from '../typings/vip'
import { IWeather, IPhoneLoginParams } from '../typings'

class Userc {
  private prefix = 'userc/v2'

  async phoneLogin(data: IPhoneLoginParams) {
    return await service.put<IUserInfo>({
      url: `${this.prefix}/auth/phonelogin/code`,
      data: data
    })
  }

  async getCurrentDate() {
    try {
      const res = await service.get<number>({
        url: `${this.prefix}/system/now`,
        timeout: 3000
      })

      return res.data
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
    return await service.get<IUserInfo>({
      url: `${this.prefix}/user`,
      timeout: 20000
    })
  }
  // 获取当前用户信息
  async getCombo() {
    return await service.get<IVipMember>({
      url: `${this.prefix}/member`
    })
  }

  // 邀请协作人[模态框] > 获取 - 飞项协作人 - 列表
  async getContacts(last_sync_at?: number) {
    const res = await service.get<IContactsAndStatus[]>({
      url: `${this.prefix}/user/interacts`,
      params: { last_sync_at }
    })

    res.data = (res.data || []).map((item) => ({
      ...item,
      status: EConCheckStatus.unChecked
    }))

    return res
  }

  /**
   * 事项权限
   * **/
  async taskPower(task_id: string) {
    return await service.get<IMemberApi>({
      url: `${this.prefix}/member/task/${task_id}`
    })
  }

  /**
   * 天气
   */
  async getWeather() {
    return await service.get<IWeather>({
      url: `${this.prefix}/weather`
    })
  }
}

export const UsercApi = new Userc()
