import React, { useState } from 'react'
import { useMemoizedFn, useMount } from 'ahooks'
import styles from './index.module.scss'
import { UsageMode } from './components/usage-mode'
import { usageModeType } from '@flyele-nx/types'
import { Personal } from './components/personal'
import { Team } from './components/team'

type currentStepType = 1 | 2

const _NoviceGuide = ({
  onFinished
}: {
  onFinished: (type: usageModeType) => void
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
            onFinished={() => onFinished('personal')}
          />
        ) : (
          <Team
            onBack={() => {
              setCurrentStep(1)
            }}
            onFinished={() => onFinished('team')}
          />
        )
      ) : null}
    </div>
  )
}

export const NoviceGuide = React.memo(_NoviceGuide)
