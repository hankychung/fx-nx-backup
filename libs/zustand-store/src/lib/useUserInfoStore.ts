import { create } from 'zustand'
import {
  IUserInfoState,
  SettingFileSyncPolicy,
  SettingRobotBindState
} from '@flyele-nx/types'

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
  // 用户设置
  // TODO: 用到的时候再补默认值
  setting: {
    view_sort: '1,2,3,5',
    show_mode: '',
    robot_bind_state: '' as SettingRobotBindState,
    file_sync_policy: '' as SettingFileSyncPolicy,
    total_space: '',
    used_space: '',
    acc_notify_state: '',
    early_remind_date: '',
    early_remind_time: '',
    enable_early: '',
    enable_night: '',
    full_view: '',
    last_login_time: '',
    mobile_online: '',
    new_message_notify: '',
    night_remind_date: '',
    night_remind_time: '',
    official_acc_subscribe: '' as '0' | '1',
    open_mobile_not_notify: '' as '1' | '2',
    pc_online: '',
    robot_state: '',
    show_message_detail: '',
    space_directory_sort: '',
    menu_bar_view: '',
    menu_bar_item_sort: ''
  }
}

const useUserInfoStore = create<IUserInfoState>(() => {
  return {
    ...initUserInfo
  }
})

export { useUserInfoStore, initUserInfo }
