import React, { useState } from 'react'
import { useMemoizedFn, useMount } from 'ahooks'
import styles from './index.module.scss'
import { UsageMode } from './components/usage-mode'
import { usageModeType } from '@flyele-nx/types'
import { Personal } from './components/personal'
import { Team } from './components/team'
import { IGoHomeParams } from './types'

type currentStepType = 1 | 2

const _NoviceGuide = ({
  userId,
  onFinished,
  onGoHome
}: {
  userId: string
  onFinished: (type: usageModeType) => void // 通知后端，已经完成新手引导
  // 前端用于跳转到首页或者其他页面，因为 onFinished 的时机不同，导致不能统一使用 onFinished
  onGoHome: (type: usageModeType, data?: IGoHomeParams) => void
}) => {
  const [currentStep, setCurrentStep] = useState<currentStepType>(1)
  const [usageMode, setUsageMode] = useState<usageModeType>('')

  const onSelectUsageMode = useMemoizedFn((key: usageModeType) => {
    setUsageMode(key)
    setCurrentStep(2)
  })

  useMount(() => {
    setCurrentStep(1)
  })

  return (
    <div className={styles.noviceGuideRoot}>
      {currentStep === 1 ? (
        <UsageMode
          visible={currentStep === 1}
          onSelectUsageMode={onSelectUsageMode}
        />
      ) : currentStep === 2 ? (
        usageMode === 'personal' ? (
          <Personal
            onBack={() => {
              setCurrentStep(1)
            }}
            onGoHome={() => onGoHome('personal')}
            onFinished={() => onFinished('personal')}
          />
        ) : (
          <Team
            userId={userId}
            onBack={() => {
              setCurrentStep(1)
            }}
            onGoHome={(spaceId) =>
              onGoHome('team', {
                spaceId: spaceId
              })
            }
            onFinished={() => onFinished('team')}
          />
        )
      ) : null}
    </div>
  )
}

export const NoviceGuide = React.memo(_NoviceGuide)
