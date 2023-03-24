import { service } from '../service'
import {
  CommonListResponse,
  CommonResponse,
  IExternalListResponse
} from '../typings'
import { OrderSystemType } from '../../index'

class OrderSystem {
  private prefix = 'order-system/v1'

  /**
   * 手机号登录
   */
  async phoneLogin(
    params: OrderSystemType.ILoginParams
  ): Promise<CommonResponse<OrderSystemType.ILoginUser>> {
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

  /**
   * 订单统计
   */
  async getIndentAnalysis() {
    return await service.get<OrderSystemType.IIndentAnalysis, IExternalListResponse>({
      url: `${this.prefix}/indent/analysis`
    })
  }

  /**
   * 订单列表
   */
  async getIndentList(
    params: OrderSystemType.IIndentListParams
  ): Promise<CommonListResponse<OrderSystemType.IIndentList[]>> {
    return await service.get({
      url: `${this.prefix}/indent/list`,
      params
    })
  }

  /**
   * 获取订单详情
   */
  async getIndentDetail(indent_id: string) {
    return await service.get({
      url: `${this.prefix}/indent/${indent_id}`
    })
  }
}

export const OrderSystemApi = new OrderSystem()
