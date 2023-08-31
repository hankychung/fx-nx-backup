import React from 'react'
import { Avatar, MatterCreateCell } from '@flyele-nx/ui'
import styles from './index.module.scss'
import {
  Taker,
  TakerAddDisabledIcon,
  TakerAddIcon,
  TakerRemoveIcon
} from '@flyele-nx/icon'
import { inviteModal } from '../../../invite-modal'
import { useContactStore } from '@flyele-nx/zustand-store'
import { uniq } from 'lodash'
import { memberRemoveModal } from '../../../member-remove-modal'

interface IProps {
  takers: string[]
  onChange?: (val: string[]) => void
}

const _MemberBar = (props: IProps) => {
  const { takers, onChange } = props
  const { contactDict } = useContactStore()
  // TODO: 待补充
  const addDisabled = false

  const handlerAddTakers = () => {
    inviteModal.open({
      defaultTakers: takers,
      onConfirm: (val) => {
        const res = uniq([...val, ...takers])
        onChange?.(res)
      }
    })
  }

  const handlerRemoveTakers = () => {
    memberRemoveModal.open({
      defaultTakers: takers,
      onConfirm: (val) => {
        const res = takers.filter((id) => !val.includes(id))
        onChange?.(res)
      }
    })
  }

  return (
    <div>
      <MatterCreateCell
        isMatterCreate
        img={() => <Taker width={16} height={16} color="rgba(0, 0, 0, 0.88)" />}
      >
        <div className={styles['member-bar']}>协作人</div>
      </MatterCreateCell>
      <div className={styles['member-content']}>
        {takers?.map((id) => {
          const item = contactDict[id]

          return (
            <Avatar
              vipType={item.vip_type}
              vipNextExpiredAt={item.vip_next_expired_at}
              src={item.avatar}
              key={item.user_id}
              size={28}
            />
          )
        })}
        {addDisabled ? (
          <TakerAddDisabledIcon className={styles['member-bar-item']} />
        ) : (
          <TakerAddIcon
            onClick={handlerAddTakers}
            className={styles['member-bar-item']}
          />
        )}
        <TakerRemoveIcon
          onClick={handlerRemoveTakers}
          className={styles['member-bar-item']}
        />
      </div>
    </div>
  )
}

export const MemberBar = React.memo(_MemberBar)
