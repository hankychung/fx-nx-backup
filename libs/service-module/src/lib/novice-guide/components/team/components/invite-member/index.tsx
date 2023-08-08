import React from 'react'
import { CommonPage } from '../../../common/page'
import styles from './index.module.scss'
import { useMemoizedFn } from 'ahooks'

const _InviteMember = ({
  visible,
  onFinished
}: {
  visible: boolean
  onFinished: () => void
}) => {
  const onGoNext = useMemoizedFn(() => {
    onFinished()
  })

  return (
    <CommonPage
      visible={visible}
      title="最后一步！邀请你的成员"
      desc=""
      disableNext={false}
      needFooter={false}
    >
      <div className={styles.inviteMemberRoot}>1233</div>
    </CommonPage>
  )
}

export const InviteMember = React.memo(_InviteMember)
