import React, { useMemo } from 'react'
import { FlyMemberSelector } from '@flyele/flyele-components'
import style from './inviteModal.module.scss'
import { useContactStore } from '@flyele-nx/zustand-store'
import { invitePlugin } from '.'

interface IProps {
  close: () => void
}

const InviteModal: React.FC<IProps> = ({ close }) => {
  const plugins = useMemo(() => {
    return [
      new invitePlugin.interact({
        memberList: useContactStore.getState().interacts.map((item) => ({
          ...item,
          userId: item.user_id,
          name: item.nick_name
        }))
      })
    ]
  }, [])

  return (
    <div className={style['invite-modal']}>
      <div className={style.header}>header</div>
      <div>
        <FlyMemberSelector plugins={plugins} />
      </div>
    </div>
  )
}

export { InviteModal }
