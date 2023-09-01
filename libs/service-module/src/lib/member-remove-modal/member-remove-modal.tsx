import {
  FlyMemberRemoveSelector,
  IFlyAvatarItemState,
  useMemoizedFn
} from '@flyele/flyele-components'
import css from './index.module.scss'
import { Close } from '@flyele-nx/icon'
import { useMemo } from 'react'
import { useContactStore } from '@flyele-nx/zustand-store'

interface IProps {
  onClose: () => void
  title?: string
  defaultTakers?: string[]
  onConfirm?: (takers: string[]) => void
}

export const MemberRemoveModal = (props: IProps) => {
  const { onClose, title = '移除协作人', defaultTakers = [], onConfirm } = props
  const { contactDict } = useContactStore()

  const originList: IFlyAvatarItemState[] = useMemo(() => {
    return defaultTakers.map((id) => {
      const item = contactDict[id]
      return {
        ...item,
        state: 'normal',
        userId: item.user_id,
        name: item.nick_name
      }
    })
  }, [defaultTakers, contactDict])

  const confirm = useMemoizedFn((takerIds: string[]) => {
    onConfirm?.(takerIds)
    onClose()
  })

  return (
    <div className={css.wrap}>
      <header className={css.header}>
        <div className={css.title}>{title}</div>
        <div className={css.close} onClick={onClose}>
          <Close />
        </div>
      </header>

      <div className={css.content}>
        <FlyMemberRemoveSelector
          onCancel={onClose}
          originList={originList}
          onConfirm={confirm}
        />
      </div>
    </div>
  )
}
