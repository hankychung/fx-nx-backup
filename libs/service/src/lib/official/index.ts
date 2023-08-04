import { service } from '../service'
import { IOfficialCorpDetail, IUserEnterpriseTakers } from '@flyele-nx/types'

class Official {
  private prefix = 'official/v1'

  /**
   * 获取企业通讯录
   */
  async getAddressBook(corp_id: string) {
    return service.get<{ corp_user: IUserEnterpriseTakers[] }>({
      url: `${this.prefix}/corp/address_book`,
      params: { corp_id }
    })
  }

  /**
   * 查询企业版本详情
   */
  getCorpDetail(corpid: string) {
    return service.get<IOfficialCorpDetail>({
      url: `${this.prefix}/corp/detail`,
      params: { corpid }
    })
  }
}

export const OfficialApi = new Official()
