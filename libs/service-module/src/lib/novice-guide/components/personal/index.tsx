import { useState } from 'react'
import { CareerChoice } from './components/career-choice'
import { useMemoizedFn } from 'ahooks'
import { PersonalCreateTask } from './components/personal-create-task'
import { PersonalContext } from '../../context/personal'
import { IIndustryUserType } from '@flyele-nx/types'

/**
 * 1： 选择职业页面
 * 2： 创建事项页面
 */
type currentStepType = 1 | 2

export const Personal = ({
  onBack,
  onFinished,
  onGoHome
}: {
  onBack: () => void
  onFinished: (data: IIndustryUserType) => void
  onGoHome: () => void
}) => {
  const [currentStep, setCurrentStep] = useState<currentStepType>(1)
  const [tag, setTag] = useState(0)
  const [tagName, setTagName] = useState('')

  const onCareerGoNext = useMemoizedFn(() => {
    setCurrentStep(2)
  })

  return (
    <PersonalContext.Provider
      value={{
        activeTag: tag,
        activeTagName: tagName,
        setActiveTag: (tag: number) => {
          setTag(tag)
        },
        setActiveTagName: (tagName: string) => {
          setTagName(tagName)
        }
      }}
    >
      <CareerChoice
        visible={currentStep === 1}
        goBack={onBack}
        goNext={onCareerGoNext}
      />
      <PersonalCreateTask
        visible={currentStep === 2}
        goBack={() => {
          setCurrentStep(1)
        }}
        onFinished={() =>
          onFinished({
            job: tagName
          })
        }
        onGoHome={onGoHome}
      />
    </PersonalContext.Provider>
  )
}
