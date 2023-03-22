import { service } from '../service'
import { CommonResponse } from '../typings'
import { ILoginParams, ILoginUser } from '../../index'

class OrderSystem {
  private prefix = 'order-system/v1'

  /**
   * 手机号登录
   */
  async phoneLogin(params: ILoginParams): Promise<CommonResponse<ILoginUser>> {
    return await service.post({
      url: `${this.prefix}/login`,
      data: params
    })
  }

  /**
   * 获取手机验证码
   */
  async getPhoneLoginCode(params: { telephone: string }) {
    return await service.post({
      url: `${this.prefix}/phonelogin/code`,
      data: params
    })
  }

  /**
   * 登出
   */
  async logout() {
    return await service.post({
      url: `${this.prefix}/logout`
    })
  }
}

export const OrderSystemApi = new OrderSystem()
