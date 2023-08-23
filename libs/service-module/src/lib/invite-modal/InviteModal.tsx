import React, { useMemo } from 'react'
import { FlyMemberSelector } from '@flyele/flyele-components'
import style from './inviteModal.module.scss'
import { useContactStore } from '@flyele-nx/zustand-store'
import { invitePlugin } from '.'
import { useMemoizedFn } from 'ahooks'

interface IOuterProps {
  defaultTakers?: string[]
}

interface IProps extends IOuterProps {
  close: () => void
}

const InviteModal: React.FC<IProps> = ({ close, defaultTakers = [] }) => {
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

  const confirm = useMemoizedFn((takerIds: string[]) => {
    console.log(takerIds)
    close()
  })

  return (
    <div className={style['invite-modal']}>
      <div className={style.header}>header</div>
      <div>
        <FlyMemberSelector
          plugins={plugins}
          onConfirm={confirm}
          onCancel={close}
          defaultTakers={defaultTakers}
        />
      </div>
    </div>
  )
}

export { InviteModal }

export type { IOuterProps }
