import React, { useMemo } from 'react'
import {
  FlyMemberSelector,
  FlyMemberBookCtrl,
  useController
} from '@flyele/flyele-components'
import style from './inviteModal.module.scss'
import { useContactStore } from '@flyele-nx/zustand-store'
import { invitePlugin } from '.'
import { useMemoizedFn } from 'ahooks'
import { Header } from './components/header'
import { Tabs } from 'antd'
import { IInviteParams, InviteMoadlTabKey } from '@flyele-nx/types'
import { InviteLink } from './components/invite-link'
import { QrcodeInvite } from './components/qrcode-invite'

interface IOuterProps {
  defaultTakers?: string[]
  inviteParams?: IInviteParams
}

interface IProps extends IOuterProps {
  close: () => void
}

const InviteModal: React.FC<IProps> = ({
  close,
  defaultTakers = [],
  inviteParams = {}
}) => {
  const controller = useController(new FlyMemberBookCtrl())

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
    console.log(takerIds, controller.checkedStateMember.values())
    close()
  })

  const tabItems = [
    {
      key: InviteMoadlTabKey.member,
      label: '飞项协作人',
      children: (
        <div className={style.content}>
          <FlyMemberSelector
            plugins={plugins}
            onConfirm={confirm}
            onCancel={close}
            defaultTakers={defaultTakers}
            controller={controller}
            onInitSetMemberState={(id) => {
              if (defaultTakers.includes(id)) {
                return 'checked'
              }

              return 'normal'
            }}
          />
        </div>
      )
    },
    {
      key: InviteMoadlTabKey.qrcode,
      label: '二维码邀请',
      children: (
        <div className={style.content}>
          <QrcodeInvite inviteParams={inviteParams} isNote={false} />
        </div>
      )
    },
    {
      key: InviteMoadlTabKey.link,
      label: '邀请链接',
      children: (
        <div className={style.content}>
          <InviteLink inviteParams={inviteParams} />
        </div>
      )
    }
  ]

  return (
    <div className={style['invite-modal']}>
      <Header />
      <Tabs items={tabItems}></Tabs>
    </div>
  )
}

export { InviteModal }

export type { IOuterProps }
