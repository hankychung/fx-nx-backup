import React from 'react'
import css from './index.module.scss'
import cs from 'classnames'
import {
  CloseRedIcon,
  LockIcon,
  RemovedTextIcon,
  SelectedIcon,
  WarmingIcon
} from '@flyele-nx/icon'

/**
 author: william   email:362661044@qq.com
 create_at:2022/12/7 6:40 PM
 **/

type IWorkflowMemberIcon = {
  isCreate?: boolean
  handleDelete?: (userId: string) => void
  userId: string // 协作人id
  avatar: string // 协作人头像
  isLock?: boolean // 是否固定协作人
  canRemove?: boolean // 是否可移除协作人
  isBack?: boolean // 是否退回
  isComplete?: boolean // 是否完成
  isRemoved?: boolean // 是否已移出
  name?: string //协作人昵称
  isTeamVip?: boolean // 是否团队会员
  isVip?: boolean //是否个人会员
}

export const WorkflowMemberIcon = React.memo(
  ({
    isLock,
    canRemove,
    userId,
    isComplete,
    isBack,
    isCreate,
    isRemoved,
    handleDelete
  }: IWorkflowMemberIcon) => {
    WorkflowMemberIcon.displayName = 'WorkflowMemberIcon'

    // 已移出
    if (isRemoved) {
      return (
        <div className={cs(css.iconBottomGroup, css.removedText)}>
          <RemovedTextIcon />
        </div>
      )
    }
    // 仅锁定
    if (isLock && !isComplete && !isBack) {
      return <LockIcon />
    }
    // 仅删除
    if (canRemove && isCreate) {
      return (
        <CloseRedIcon
          className={css.close}
          onClick={() => {
            handleDelete?.(userId)
          }}
        />
      )
    }
    // 仅完成
    if (isComplete && !isLock) {
      return <SelectedIcon />
    }
    // 仅退回
    if (isBack && !isLock) {
      return <WarmingIcon />
    }
    // 锁定+完成
    if (isLock && isComplete) {
      return (
        <div className={css.iconBottomGroup}>
          <LockIcon className={css.lock} />
          <SelectedIcon className={css.complete} />
        </div>
      )
    }
    // 锁定+退回
    if (isLock && isBack) {
      return (
        <div className={css.iconBottomGroup}>
          <LockIcon className={css.lock} />
          <WarmingIcon className={css.back} />
        </div>
      )
    }

    return null
  }
)
