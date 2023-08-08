import { useState } from 'react'
import { IndustryType } from './components/industry-type'
import { CreateSpace } from './components/create-space'
import { useMemoizedFn } from 'ahooks'
import { CreateProject } from './components/create-project'
import { InviteMember } from './components/invite-member'

/**
 * 1： 选择行业页面
 * 2： 创建空间页面
 * 3： 创建空间项目页面
 * 4： 邀请成员页面
 */
type currentStepType = 1 | 2 | 3 | 4

export const Team = ({
  onBack,
  onFinished
}: {
  onBack: () => void
  onFinished: () => void
}) => {
  const [currentStep, setCurrentStep] = useState<currentStepType>(1)

  /**
   * 选择行业页面下一步
   */
  const onIndustryGoNext = useMemoizedFn(() => {
    setCurrentStep(2)
  })

  /**
   * 创建空间页面下一步
   */
  const onSpaceGoNext = useMemoizedFn(() => {
    setCurrentStep(3)
  })

  /**
   * 创建项目页面下一步
   */
  const onProjectGoNext = useMemoizedFn(() => {
    setCurrentStep(4)
  })

  return (
    <>
      <IndustryType
        visible={currentStep === 1}
        goBack={onBack}
        goNext={onIndustryGoNext}
      />
      <CreateSpace
        visible={currentStep === 2}
        goBack={() => {
          setCurrentStep(1)
        }}
        goNext={onSpaceGoNext}
      />
      <CreateProject
        visible={currentStep === 3}
        goBack={() => {
          setCurrentStep(2)
        }}
        goNext={onProjectGoNext}
      />
      <InviteMember visible={currentStep === 4} onFinished={onFinished} />
    </>
  )
}
