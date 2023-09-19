import { I18N } from '@flyele-nx/i18n'
import person_icon from '../../../assets/payImg/person_icon.svg'
import team_icon from '../../../assets/payImg/team_icon.svg'
import view from '../../../assets/payImg/view.svg'
import customize from '../../../assets/payImg/customize.svg'
import files from '../../../assets/payImg/files.svg'
import operation from '../../../assets/payImg/operation.svg'
import member from '../../../assets/payImg/member.svg'
import takers from '../../../assets/payImg/takers.svg'
import target from '../../../assets/payImg/target.svg'
import application from '../../../assets/payImg/application.svg'
import space from '../../../assets/payImg/space.svg'
import data from '../../../assets/payImg/data.svg'
import space_view from '../../../assets/payImg/space_view.svg'
import person_vip from '../../../assets/payImg/person_vip.svg'

type ListType = {
  title: string
  desc: string
  icon: string
}

export type SectionType = {
  h1: string
  icon: string
  tab: string
  desc: string
  list: Array<ListType>
}
export type TemIProps = {
  person: SectionType // 个人会员
  team: SectionType // 团队会员
}
// 类型
export enum VipMealType {
  PERSON = 1, // 普通
  TEAM // 文件入口
}
export type TabType = {
  h1: string
  icon: string
  tab: string
  active: boolean
  type: VipMealType
}
export const tabs = (): TabType[] => {
  const tabs = [
    {
      type: VipMealType.PERSON,
      h1: I18N.common.premium,
      icon: person_icon,
      tab: I18N.common.morePowerfulOnes,
      active: true
    },
    {
      type: VipMealType.TEAM,
      h1: I18N.common.business,
      icon: team_icon,
      tab: I18N.common.moreComprehensiveAndSpecialized,
      active: false
    }
  ]

  return tabs
}
export const createVipMealText = (): TemIProps => {
  return {
    person: {
      h1: I18N.common.premium,
      icon: person_icon,
      tab: I18N.common.morePowerfulOnes,
      desc: I18N.common.openPersonVipGetMore,
      list: [
        {
          title: I18N.common.multipleViewsCan,
          desc: I18N.common.supportImportantTight,
          icon: view
        },
        {
          title: I18N.common.addCollaborators,
          desc: I18N.common.numberOfCollaborators,
          icon: member
        },
        {
          title: I18N.common.moreSubItems,
          desc: I18N.common.numberOfSubItems,
          icon: takers
        },
        {
          title: I18N.common.largerAttachments,
          desc: I18N.common.onASingleFile,
          icon: files
        },
        {
          title: I18N.common.convenientOperation,
          desc: I18N.common.batchOperationBook,
          icon: operation
        },
        {
          title: I18N.common.customCapability,
          desc: I18N.common.moreCustomizations,
          icon: customize
        }
      ]
    },
    team: {
      h1: I18N.common.business,
      icon: team_icon,
      tab: I18N.common.moreComprehensiveAndSpecialized,
      desc: I18N.common.openingVipUseSpace,
      list: [
        {
          title: I18N.common.allIndividualsWill,
          desc: I18N.common.includeAll,
          icon: person_vip
        },
        {
          title: I18N.common.infiniteSpaceTerm,
          desc: I18N.common.supportForCreatingNone,
          icon: space
        },
        {
          title: I18N.common.dataAnalysis,
          desc: I18N.common.forTeamItems,
          icon: data
        },
        {
          title: I18N.common.moreSpaceVision,
          desc: I18N.common.memberScheduleIsEmpty,
          icon: space_view
        },
        {
          title: I18N.common.objectives,
          desc: I18N.common.developTeamObjectives,
          icon: target
        },
        {
          title: I18N.common.templateLibrary,
          desc: I18N.common.buildAProjectModel,
          icon: application
        }
      ]
    }
  }
}
