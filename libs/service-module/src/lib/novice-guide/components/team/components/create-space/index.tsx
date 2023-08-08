import React, { useMemo, useState } from 'react'
import { CommonPage } from '../../../common/page'
import styles from './index.module.scss'
import { useMemoizedFn } from 'ahooks'

const _CreateSpace = ({
  visible,
  goBack,
  goNext
}: {
  visible: boolean
  goBack: () => void
  goNext: () => void
}) => {
  const [spaceName, setSpaceName] = useState('')

  const onGoBack = useMemoizedFn(() => {
    goBack()
  })

  const onGoNext = useMemoizedFn(() => {
    goNext()
  })

  const disableNext = useMemo(() => {
    return spaceName === ''
  }, [spaceName])

  return (
    <CommonPage
      visible={visible}
      title="创建你的团队空间"
      desc=""
      disableNext={disableNext}
      goBack={onGoBack}
      goNext={onGoNext}
    >
      <div>1233</div>
    </CommonPage>
  )
}

export const CreateSpace = React.memo(_CreateSpace)
