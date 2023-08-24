import { MemberBookPlugin, IFlyAvatarItem } from '@flyele/flyele-components'
import React from 'react'
import { IInviteTaker } from '@flyele-nx/types'
import { ContactItem } from '../components/contact-item'
import { UserInfoUtils } from '@flyele-nx/utils'
import { useUserInfoStore } from '@flyele-nx/zustand-store'

export class MatterRelatedPlugin extends MemberBookPlugin {
  expandBarConfig: {
    title(): React.ReactNode | string
    checkAllBtn: boolean
  } = {
    title(): React.ReactNode | string {
      return '事项相关'
    },
    checkAllBtn: true
  }

  get myId() {
    return useUserInfoStore.getState().userInfo.user_id
  }

  rerender = (item: IFlyAvatarItem) => {
    return <ContactItem item={item} isMy={item.userId === this.myId} />
  }

  showPinYinGroup = false

  static factory(list: IInviteTaker[]): MatterRelatedPlugin {
    const memberList: IFlyAvatarItem[] = list.map((item) => {
      const { isTeamVip, isVip } = UserInfoUtils.checkVipType({
        vip_type: item.vip_type
      })

      return {
        avatar: item.avatar,
        name: item.nick_name,
        pinyin: item.pinyin,
        userId: item.taker_id,
        isTeamVip,
        isVip
      }
    })

    return new MatterRelatedPlugin({ memberList })
  }
}
