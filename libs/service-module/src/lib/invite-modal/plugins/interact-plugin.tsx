import { MemberBookPlugin, IFlyAvatarItem } from '@flyele/flyele-components'
import React from 'react'
import { ContactItem } from '../components/contact-item'
import { useUserInfoStore } from '@flyele-nx/zustand-store'

export class InteractPlugin extends MemberBookPlugin<IFlyAvatarItem> {
  constructor(args: { memberList: IFlyAvatarItem[] }) {
    super({
      memberList: args.memberList,
      topSortIds: [useUserInfoStore.getState().userInfo.user_id]
    })
  }

  get myId() {
    return useUserInfoStore.getState().userInfo.user_id
  }

  rerender = (item: IFlyAvatarItem) => {
    return <ContactItem item={item} isMy={item.userId === this.myId} />
  }

  showPinYinGroup = true

  expandBarConfig: {
    title(): React.ReactNode | string
    checkAllBtn: boolean
  } = {
    title(): React.ReactNode | string {
      return '我的协作人'
    },
    checkAllBtn: false
  }
}
