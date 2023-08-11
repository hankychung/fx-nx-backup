import { Image } from 'antd'
export interface IEqualComparisonData {
  key: string
  title: string // 标题
  desc?: string // 描述，tooltip显示
  free: string | boolean // 免费的权益
  personal: string | boolean // 个人会员的权益
  team: string | boolean // 团队会员的权益
  teamDesc?: string // 团队会员的权益， tooltip显示
  onclick?: boolean
}

export interface IEqualComparison {
  [key: string]: {
    title: string
    data: IEqualComparisonData[]
  }
}

/**
 * 身份权益对比
 */
export const identityEqualComparisonData: IEqualComparison = {
  taskAbility: {
    title: '事项能力',
    data: [
      {
        key: 'taskNumber',
        title: '事项数量',
        free: '无限',
        personal: '无限',
        team: '无限'
      },
      {
        key: 'taskChildNumber',
        title: '子孙事项数',
        free: '20个，最多3层',
        personal: '200个，最多8层',
        team: '200个，最多8层'
      },
      {
        key: 'taskTakerNumber',
        title: '单一事项协作人数',
        free: '20人',
        personal: '100人',
        team: '100人'
      },
      {
        key: 'taskImport',
        title: '事项导入',
        free: true,
        personal: true,
        team: true
      },
      {
        key: 'taskExport',
        title: '事项导出',
        free: false,
        personal: true,
        team: true
      },
      {
        key: 'customCircle',
        title: '自定义循环频率',
        free: false,
        personal: true,
        team: true
      }
    ]
  },
  functionalUse: {
    title: '功能使用',
    data: [
      {
        key: 'weekView',
        title: '周视图',
        free: true,
        personal: true,
        team: true
      },
      {
        key: 'mouthView',
        title: '月视图',
        free: true,
        personal: true,
        team: true
      },
      {
        key: 'fullView',
        title: '全量表格视图',
        free: true,
        personal: true,
        team: true
      },
      {
        key: 'customView',
        title: '自定义视图',
        free: '1个',
        personal: '10个',
        team: '10个'
      },
      {
        key: 'fourView',
        title: '四象限视图',
        free: false,
        personal: true,
        team: true
      },
      {
        key: 'personalChromatogramView',
        title: '个人脉络视图',
        free: false,
        personal: true,
        team: true
      },
      {
        key: 'personalRelationView',
        title: '个人关系视图',
        free: false,
        personal: true,
        team: true
      },
      {
        key: 'personalTarget',
        title: '个人目标',
        free: '20个，不可派发',
        personal: true,
        team: true
      },
      {
        key: 'personalApplication',
        title: '个人模版库',
        desc: '会员可快速制作事项模版，规范事项工作流。',
        free: false,
        personal: true,
        team: true
      },
      {
        key: 'mouthSmallTool',
        title: '月视图挂件（电脑端）',
        free: false,
        personal: true,
        team: true
      },
      {
        key: 'taskChromatogram',
        title: '事项脉络图',
        free: '仅支持查看',
        personal: '仅支持查看与操作',
        team: '仅支持查看与操作'
      },
      {
        key: 'batchOperation',
        title: '批量操作',
        free: true,
        personal: true,
        team: true
      },
      {
        key: 'localCalendarSync',
        title: '本地日历同步',
        free: false,
        personal: true,
        team: true
      },
      {
        key: 'tableHeader',
        title: '表格表头显示',
        free: '5个',
        personal: true,
        team: true
      },
      {
        key: 'notice',
        title: '笔记',
        free: true,
        personal: true,
        team: true
      },
      {
        key: 'noticeWithTask',
        title: '笔记关联事项',
        free: false,
        personal: true,
        team: true
      }
    ]
  },
  dataAbility: {
    title: '数据能力',
    data: [
      {
        key: 'fileSave',
        title: '文件存储',
        free: '2G',
        personal: '20G',
        team: '20G'
      },
      {
        key: 'fileUpdateSize',
        title: '单个文件上传大小',
        free: '50M',
        personal: '300M',
        team: '300M'
      }
    ]
  },
  teamSpace: {
    title: '团队空间',
    data: [
      {
        key: 'freeSpace',
        title: '免费空间',
        free: '创建1个，加入无限',
        personal: '创建1个，加入无限',
        team: '创建无限，加入无限'
      },
      {
        key: 'specialSpace',
        title: '专业空间',
        free: false,
        personal: false,
        team: '创建无限，加入无限'
      }
    ]
  }
}

/**
 * 空间权益对比
 */
export const spaceEqualComparisonData: IEqualComparison = {
  space: {
    title: '',
    data: [
      {
        key: 'spaceMember',
        title: '内部成员',
        free: '20人，无需会员即可加入',
        personal: '20人，无需会员即可加入',
        team: '无限，仅团队会员可加入',
        teamDesc:
          '如需获得空间中所有付费服务，请开通团队会员；只有团队会员才能加入专业版空间、使用高级功能。',
        onclick: true
      },
      {
        key: 'externalMember',
        title: '外部成员',
        free: false,
        personal: false,
        team: '无限，无需会员即可加入',
        teamDesc: '外部成员可提供有限协作能力，无需付费即可参与事项',
        onclick: true
      },
      {
        key: 'spaceProjectNum',
        title: '单一空间内项目个数',
        free: '20个',
        personal: '20个',
        team: '无限'
      },
      {
        key: 'projectMember',
        title: '项目成员',
        free: '20个',
        personal: '20个',
        team: '空间人数'
      },
      {
        key: 'projectTask',
        title: '项目内事项数',
        free: '100个',
        personal: '100个',
        team: '无限'
      },
      {
        key: 'spaceTask',
        title: '空间事项总数',
        free: '500个',
        personal: '500个',
        team: '无限'
      },
      {
        key: 'spaceSave',
        title: '空间存储',
        free: '2G',
        personal: '2G',
        team: '人数*10G',
        teamDesc: '空间容量=内部成员中团队会员数量*10G'
      },
      {
        key: 'dataReport',
        title: '数据报表',
        free: false,
        personal: false,
        team: true
      },
      {
        key: 'applicationTemplateNum',
        title: '模版模版数量',
        free: '2个',
        personal: '2个',
        team: true
      },
      {
        key: 'teamTarget',
        title: '团队目标',
        free: false,
        personal: false,
        team: true
      },
      {
        key: 'teamMemberTarget',
        title: '团队成员日程',
        free: false,
        personal: false,
        team: true
      },
      {
        key: 'teamMonthView',
        title: '团队月视图',
        free: false,
        personal: false,
        team: true
      },
      {
        key: 'relationView',
        title: '关系视图',
        free: false,
        personal: false,
        team: true
      },
      {
        key: 'spaceChromatogram',
        title: '空间脉络图',
        free: false,
        personal: false,
        team: true
      },
      {
        key: 'projectChromatogram',
        title: '项目脉络图',
        free: false,
        personal: false,
        team: true
      },
      {
        key: 'spaceAvaOrBg',
        title: '高级空间头像/背景',
        free: false,
        personal: false,
        team: true
      },
      {
        key: 'spaceTaskChildNumber',
        title: '子孙事项数',
        free: '20个，最多3层',
        personal: '20个，最多3层',
        team: '200个，最多8层'
      },
      {
        key: 'spaceTaskTakerNumber',
        title: '单一事项协作人数',
        free: '20人',
        personal: '20人',
        team: '无限'
      },
      {
        key: 'spaceTaskExport',
        title: '事项导出',
        free: false,
        personal: false,
        team: true
      }
    ]
  }
}
