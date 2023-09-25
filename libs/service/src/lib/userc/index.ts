import dayjs from 'dayjs'
import { uid } from '@flyele-nx/utils'
import { service } from '../service'
import { EConCheckStatus, appInfo } from '@flyele-nx/constant'
import {
  IContactsAndStatus,
  IRefreshToken,
  IUserInfo,
  ILoginKeyParams,
  IVipMember,
  IWeather,
  IPhoneLoginParams,
  IUserSetting,
  IIndustryListParams,
  IIndustryList,
  IIndustryInfo,
  IResetPassword,
  IOverseasLogin,
  IOverseasCreateAccount,
  IOverseasGetCode
} from '@flyele-nx/types'
import { AxiosRequestConfig } from 'axios'

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
    return await service.get<IVipMember>({
      url: `${this.prefix}/member/task/${task_id}`
    })
  }

  async getWeather() {
    return await service.get<IWeather>({
      url: `${this.prefix}/weather`
    })
  }

  async refreshToken() {
    const { platform, version } = appInfo

    return await service.post<IRefreshToken>({
      url: `${this.prefix}/auth/refresh`,
      data: {
        client_version: version,
        platform
      }
    })
  }

  // 更新设置
  updateSetting(
    data: {
      view_sort?: string
      monthly_config?: string
      monthly_filter?: string
      space_directory_sort?: string
    } & Record<string, any>
  ) {
    return service.post({
      url: `${this.prefix}/user/setting`,
      data
    })
  }

  // 获取用户设置
  getUserSetting() {
    return service.get<IUserSetting>({
      url: `${this.prefix}/user/setting`
    })
  }

  async updateUser(data: { avatar?: string; nick_name?: string }) {
    return await service.put({ url: `${this.prefix}/user`, data })
  }

  /**
   * 获取行业列表
   */
  async getIndustryList(data: IIndustryListParams) {
    return await service.get<IIndustryList[]>({
      url: `${this.prefix}/industry/list`,
      params: data
    })
  }

  /**
   * 获取行业详情
   */
  async getIndustryInfo(id: number) {
    return await service.get<IIndustryInfo[]>({
      url: `${this.prefix}/industry/info`,
      params: {
        industry_id: id
      }
    })
  }

  // 海外版重置密码

  async resetPassword(data: IResetPassword) {
    return await service.post({
      url: `${this.prefix}/auth/haiwaibanyouxiangchongzhimimajiekou`,
      data: data
    })
  }

  //海外版登录

  async OverseasLogin(params: IOverseasLogin) {
    return await service.post({
      url: '/auth/haiwaibanyouxiangdenglujiekou',
      data: params
    })
  }

  //海外版注册

  async OverseasCreateAccount(params: IOverseasCreateAccount) {
    return await service.post({
      url: '/auth/haiwaibanyouxiangzhucejiekou',
      data: params
    })
  }
  //海外版获取验证码

  async OverseasGetCode(params: IOverseasGetCode) {
    return await service.post({
      url: '/auth/haiwaibanyouxiangfasongyoujianjiekou',
      data: params
    })
  }
}

export const UsercApi = new Userc()

// eslint-disable-next-line
// @ts-ignore
window.__dangerous_refresh_token = async () => {
  const token = await UsercApi.refreshToken()

  console.log(token)
}
