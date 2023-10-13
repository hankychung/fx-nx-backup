export interface IPower {
  title: string
  active: boolean
  isDiyRender?: string
}

export interface IInfoType {
  key: string
  title: string
  desc: string
  bgColor: string
  btnText: string
  btnTextColor?: string
  btnBgColor?: string
  btnBorderColor?: string
  money: number | string
  unit: string
  moneyText?: string
  powerList: IPower[]
  isDiyRender?: string
}

/**
 * 中文版
 */
export const memberPowerStaticData: IInfoType[] = [
  {
    key: 'free',
    title: '免费账户',
    desc: '简单的任务管理与协作',
    bgColor: '#AFBDDB',
    btnText: '免费使用',
    btnTextColor: '#AFBDDB',
    btnBgColor: '#fff',
    btnBorderColor: '#AFBDDB',
    money: 0,
    unit: '',
    powerList: [
      {
        title: '无限事项数量',
        active: true
      },
      {
        title: '三端同步',
        active: true
      },
      {
        title: '微信任务机器人',
        active: true
      },
      {
        title: '基础视图',
        active: true
      },
      {
        title: '无限笔记数量',
        active: true
      },
      {
        title: '子事项支持3级（20个）',
        active: true
      },
      {
        title: '单个文件上限50M',
        active: true
      },
      {
        title: '个人文件容量2G',
        active: true
      },
      {
        title: '个人目标20个',
        active: true
      },
      {
        title: '1个',
        active: true,
        isDiyRender: 'free_space'
      }
    ]
  },
  {
    key: 'personal',
    title: '个人会员',
    desc: '更强大的个人事项管理权益',
    bgColor: '#FFBF5F',
    btnText: '立即开通',
    btnTextColor: '#FFFFFF',
    btnBgColor: 'linear-gradient(270.34deg, #FFB85E 2.92%, #FFD075 97.6%)',
    btnBorderColor: 'none',
    money: 128,
    unit: '年',
    powerList: [
      {
        title: '包含所有免费账户能力',
        active: true
      },
      {
        title: '子事项支持8级（200个）',
        active: true
      },
      {
        title: '四象限视图',
        active: true
      },
      {
        title: '事项协作人数提升至100人',
        active: true
      },
      {
        title: '单个文件上限300M',
        active: true
      },
      {
        title: '个人文件容量20G',
        active: true
      },
      {
        title: '自定义视图10个',
        active: true
      },
      {
        title: '个人目标无限数量，并支持派发',
        active: true
      },
      {
        title: '个人脉络视图',
        active: true
      },
      {
        title: '个人关系视图',
        active: true
      },
      {
        title: '全量表头数量无限',
        active: true
      },
      {
        title: '批量操作、导出事项、自定义循环频率',
        active: true
      },
      {
        title: '……',
        active: false
      }
    ]
  },
  {
    key: 'team',
    title: '团队会员',
    desc: '更全面更专业的团队空间权益',
    bgColor: '#755EEF',
    btnText: '立即开通',
    btnTextColor: '#fff',
    btnBgColor: 'linear-gradient(90deg, #7B5EEF 0%, #6248ED 100%)',
    btnBorderColor: 'none',
    money: 298,
    unit: '年/人',
    powerList: [
      {
        title: '包含所有个人会员能力',
        active: true
      },
      {
        title: '无限',
        active: true,
        isDiyRender: 'free_space'
      },
      {
        title: '无限',
        active: true,
        isDiyRender: 'professional_space'
      },
      {
        title: '无限项目项目数量',
        active: true
      },
      {
        title: '无限协作人数',
        active: true
      },
      {
        title: '专业空间角色管理',
        active: true
      },
      {
        title: '更大存储容量（人数*10G)',
        active: true
      },
      {
        title: '团队脉络视图',
        active: true
      },
      {
        title: '空间关系视图',
        active: true
      },
      {
        title: '数据分析',
        active: true
      },
      {
        title: '成员日程',
        active: true
      },
      {
        title: '团队目标',
        active: true
      }
    ]
  },
  {
    key: 'custom',
    title: '私有化版',
    desc: '独家定制数据私有',
    bgColor: '#535179',
    btnText: '联系销售',
    btnTextColor: '#535179',
    btnBgColor: '#fff',
    btnBorderColor: '#535179',
    money: 0,
    unit: '',
    moneyText: '添加销售为您制定方案',
    powerList: [
      {
        title: '包含所有团队会员能力',
        active: true
      },
      {
        title: '自定义私有化部署',
        active: true
      },
      {
        title: '企业组织结构导入',
        active: true
      },
      {
        title: '对接内部系统',
        active: true
      },
      {
        title: '……',
        active: false
      }
    ]
  }
]

/**
 * 英文版
 */
export const memberPowerStaticDataEn: IInfoType[] = [
  {
    key: 'free',
    title: 'Free plan',
    desc: 'Simplified personal task management',
    bgColor: '#AFBDDB',
    btnText: 'Free forever',
    btnTextColor: '#AFBDDB',
    btnBgColor: '#fff',
    btnBorderColor: '#AFBDDB',
    money: 0,
    unit: '',
    powerList: [
      {
        title: 'Unlimited Tasks & Notes',
        active: true
      },
      {
        title: '3-layer subtasks',
        active: true
      },
      {
        title: 'Assigning to 20 people in one task',
        active: true
      },
      {
        title: '2G of file storage，50M for a single file',
        active: true
      },
      {
        title: '20 individual Goals',
        active: true
      },
      {
        title: 'One',
        active: true,
        isDiyRender: 'free_space'
      }
    ]
  },
  {
    key: 'personal',
    title: 'Premium plan',
    desc: 'More advance features',
    bgColor: '#FFBF5F',
    btnText: 'Select',
    btnTextColor: '#FFFFFF',
    btnBgColor: 'linear-gradient(270.34deg, #FFB85E 2.92%, #FFD075 97.6%)',
    btnBorderColor: 'none',
    money: 48,
    unit: 'year',
    powerList: [
      {
        title: 'All Free features',
        active: true
      },
      {
        title: 'Priority View',
        active: true
      },
      {
        title: 'Mind map & Relation map',
        active: true
      },
      {
        title: '8-layer subtasks',
        active: true
      },
      {
        title: '20G of File Storage，300M for a single file',
        active: true
      },
      {
        title: '10 Custom list',
        active: true
      },
      {
        title: 'Unlimited Individual goals',
        active: true
      },
      {
        title: 'Available for inviting in goal',
        active: true
      },
      {
        title: 'Personal Mind map',
        active: true
      },
      {
        title: 'Personal Relation map',
        active: true
      },
      {
        title: 'Unlimited column in “All view”',
        active: true
      },
      {
        title: 'Export to Excel',
        active: true
      },
      {
        title: '……',
        active: false
      }
    ]
  },
  {
    key: 'team',
    title: 'Business plan',
    desc: 'For teamwork',
    bgColor: '#755EEF',
    btnText: 'Select',
    btnTextColor: '#fff',
    btnBgColor: 'linear-gradient(90deg, #7B5EEF 0%, #6248ED 100%)',
    btnBorderColor: 'none',
    money: 84,
    unit: 'member / year',
    powerList: [
      {
        title: 'All Premium features',
        active: true
      },
      {
        title: 'Unlimited',
        active: true,
        isDiyRender: 'free_space'
      },
      {
        title: 'Unlimited',
        active: true,
        isDiyRender: 'professional_space'
      },
      {
        title: 'Unlimited projects',
        active: true
      },
      {
        title: 'Unlimited members',
        active: true
      },
      {
        title: 'Unlimited guests',
        active: true
      },
      {
        title: 'More storage（member*10G)',
        active: true
      },
      {
        title: 'Team schedule',
        active: true
      },
      {
        title: 'Team Report(coming soon)',
        active: true
      },
      {
        title: 'Team Goals',
        active: true
      },
      {
        title: 'Team Mind map',
        active: true
      },
      {
        title: 'Team Relation map',
        active: true
      },
      {
        title: 'Team Template center',
        active: true
      }
    ]
  },
  {
    key: 'custom',
    title: 'Enterprise',
    desc: 'On-Premises Deployment',
    bgColor: '#535179',
    btnText: 'Contact sales',
    btnTextColor: '#535179',
    btnBgColor: '#fff',
    btnBorderColor: '#535179',
    money: 0,
    unit: '',
    moneyText: 'Let‘s talk',
    powerList: [
      {
        title: 'All Business features',
        active: true
      },
      {
        title: 'Customization Requirements',
        active: true
      },
      {
        title: 'On-Premises Deployment',
        active: true
      },
      {
        title: 'Integration with Enterprise Personnel Structure',
        active: true
      },
      {
        title: '……',
        active: false
      }
    ]
  }
]
