import React from 'react'
import { CommonPage } from '../../../common/page'
import styles from './index.module.scss'
import { useMemoizedFn } from 'ahooks'

const _CreateProject = ({
  visible,
  goBack,
  goNext
}: {
  visible: boolean
  goBack: () => void
  goNext: () => void
}) => {
  const onGoBack = useMemoizedFn(() => {
    goBack()
  })

  const onGoNext = useMemoizedFn(() => {
    goNext()
  })

  return (
    <CommonPage
      visible={visible}
      title="团队有哪些工作项目"
      desc=""
      disableNext={false}
      goBack={onGoBack}
      goNext={onGoNext}
    >
      <div className={styles.createProjectRoot}>1233</div>
    </CommonPage>
  )
}

export const CreateProject = React.memo(_CreateProject)
