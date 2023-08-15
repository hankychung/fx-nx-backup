import { useState } from 'react'
import { IndustryType } from './components/industry-type'
import { CreateSpace } from './components/create-space'
import { useMemoizedFn } from 'ahooks'
import { CreateProject } from './components/create-project'
import { InviteMember } from './components/invite-member'
import { TeamContext } from '../../context/team'
import { IIndustryTemplate } from '@flyele-nx/types'

/**
 * 1： 选择行业页面
 * 2： 创建空间页面
 * 3： 创建空间项目页面
 * 4： 邀请成员页面
 */
type currentStepType = 1 | 2 | 3 | 4

export const Team = ({
  userId,
  onBack,
  onFinished,
  onGoHome
}: {
  userId: string
  onBack: () => void
  onGoHome: (params: {
    spaceId: string
    createData?: IIndustryTemplate[]
  }) => void
  onFinished: () => void
}) => {
  const [currentStep, setCurrentStep] = useState<currentStepType>(1)

  const [activeIndustryTag, setActiveIndustryTag] = useState<number>(0)
  const [activeTeamSize, setActiveTeamSize] = useState('')
  const [activeIndustryTagTitle, setActiveIndustryTagTitle] = useState('')
  const [spaceInfo, setSpaceInfo] = useState({
    icon: '',
    icon_color: ''
  })
  const [spaceName, setSpaceName] = useState('')
  const [spaceId, setSpaceId] = useState('')

  const [createData, setCreateData] = useState<IIndustryTemplate[]>([])

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
  const onProjectGoNext = useMemoizedFn(
    (params?: { createData?: IIndustryTemplate[] }) => {
      setCurrentStep(4)
      if (params && params.createData) {
        setCreateData(params.createData)
      }
    }
  )

  return (
    <TeamContext.Provider
      value={{
        userId: userId,
        activeIndustryTag: activeIndustryTag,
        activeTeamSize: activeTeamSize,
        spaceInfo: spaceInfo,
        spaceName: spaceName,
        activeIndustryTagTitle: activeIndustryTagTitle,
        spaceId: spaceId,
        setSpaceId: setSpaceId,
        setActiveIndustryTag: setActiveIndustryTag,
        setActiveTeamSize: setActiveTeamSize,
        setSpaceInfo: setSpaceInfo,
        setSpaceName: setSpaceName,
        setActiveIndustryTagTitle: setActiveIndustryTagTitle
      }}
    >
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
        onFinished={onFinished}
      />
      <InviteMember
        visible={currentStep === 4}
        onGoHome={() =>
          onGoHome({
            spaceId,
            createData
          })
        }
      />
    </TeamContext.Provider>
  )
}
