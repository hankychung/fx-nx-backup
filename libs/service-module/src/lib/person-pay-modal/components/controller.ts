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
      h1: '个人会员',
      icon: person_icon,
      tab: '更强大的个人事项管理权益',
      active: true
    },
    {
      type: VipMealType.TEAM,
      h1: '团队会员',
      icon: team_icon,
      tab: '更全面更专业的团队空间权益',
      active: false
    }
  ]

  return tabs
}
export const createVipMealText = (): TemIProps => {
  return {
    person: {
      h1: '个人会员',
      icon: person_icon,
      tab: '更强大的个人事项管理权益',
      desc: '开通个人会员，解锁超值权益',
      list: [
        {
          title: '多种视图能力',
          desc: '支持重要紧急视图、脉络视图、关系视图',
          icon: view
        },
        {
          title: '增加协作人数',
          desc: '协作人数支持提高至100人',
          icon: member
        },
        {
          title: '更多子事项',
          desc: '子事项数量提升至200个、层级支持8级',
          icon: takers
        },
        {
          title: '更大附件、更大储存量',
          desc: '单个文件上限300M，个人文件容量20G',
          icon: files
        },
        {
          title: '便捷操作',
          desc: '批量操作、本地日历同步、导出事项',
          icon: operation
        },
        {
          title: '自定义能力',
          desc: '更多自定义视图、自定义循环频率',
          icon: customize
        }
      ]
    },
    team: {
      h1: '团队会员',
      icon: team_icon,
      tab: '更全面更专业的团队空间权益',
      desc: '开通团队会员，享专业空间权益',
      list: [
        {
          title: '所有个人会员能力',
          desc: '包含所有个人会员能力',
          icon: person_vip
        },
        {
          title: '无限空间、项目数量',
          desc: '支持创建无限的空间（基础/专业）、项目',
          icon: space
        },
        {
          title: '数据分析',
          desc: '针对团队、项目、成员的数据分析',
          icon: data
        },
        {
          title: '更多空间视图',
          desc: '成员日程、空间关系视图、脉络视图…',
          icon: space_view
        },
        { title: '目标', desc: '制定团队目标，拆解到团队成员', icon: target },
        {
          title: '模版库',
          desc: '搭建事项模板、业务流程，提高协作效率',
          icon: application
        }
      ]
    }
  }
}
