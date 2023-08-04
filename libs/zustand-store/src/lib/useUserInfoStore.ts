import { create } from 'zustand'
import { IUserInfoState } from '@flyele-nx/types'
import { CorpAppStatus, CorpUserStatus, CorpVersion } from '@flyele-nx/constant'
import dayjs from 'dayjs'

const initUserInfo = {
  userInfo: {
    nick_name: '',
    avatar: '',
    telephone: '',
    original_name: '',
    user_id: '',
    env: 'normal', // 全局域名环境地址 normal表示使用当前默认
    pinyin: '',
    create_at: 0
  },
  vip: {
    level: 0,
    deadline: 0
  },
  vipPower: undefined,
  /**
   * 是否企业版用户
   */
  isEnterprise: false,
  /**
   * 企业信息
   */
  enterprise: {
    app_status: CorpAppStatus.noPaid,
    corp_name: '-1',
    corpid: '-1',
    cu_status: CorpUserStatus.activated,
    expired_time: dayjs().add(2, 'month').unix(),
    user_count: -1,
    user_id: '-1',
    user_limit: -1,
    version: CorpVersion.trial,
    total_capacity: Number.POSITIVE_INFINITY,
    used_capacity: 0
  },
  /**
   * 企业版协作人
   */
  enterpriseTakers: []
}

const useUserInfoStore = create<IUserInfoState>(() => {
  return {
    ...initUserInfo
  }
})

export { useUserInfoStore, initUserInfo }
