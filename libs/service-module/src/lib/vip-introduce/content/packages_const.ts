import { IInfoType } from '../types'

export const memberPowerStaticData: IInfoType[] = [
  {
    key: 'free',
    title: '免费账户',
    desc: '查看完整权益',
    borderColor: 'rgba(187, 199, 225, 0.4)',
    bgColor: '#BBC7E1',
    btnText: '',
    btnTextColor: '#BBC7E1',
    btnBgColor: '#fff',
    btnBorderColor: '#BBC7E1',
    money: '0',
    unit: '',
    topText: '',
    oldPrice: '',
    powerList: [
      {
        title: '无限事项、笔记数量',
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
        title: '子事项支持3级（20个）',
        active: true
      },
      {
        title: '事项协作人数20人',
        active: true
      },
      {
        title: '单个文件50M,文件夹2G',
        active: true
      },
      {
        title: '个人目标20个',
        active: true
      },
      {
        title: '1个',
        active: true,
        isSpace: 'free_space'
      }
    ]
  },
  {
    key: 'personal',
    title: '个人会员',
    desc: '查看完整权益',
    bgColor: '#FFBF5F',
    borderColor: 'rgba(255, 191, 95, 0.4)',
    btnText: '开通使用',
    btnTextColor: '#FFFFFF',
    btnBgColor: 'linear-gradient(270.34deg, #FFB85E 2.92%, #FFD075 97.6%)',
    btnBorderColor: 'none',
    money: '128',
    unit: '年',
    topText: '',
    oldPrice: '¥128/年',
    powerList: [
      {
        title: '包含所有免费账户能力',
        active: true
      },
      {
        title: '四象限视图',
        active: true
      },
      {
        title: '关系、脉络视图',
        active: true
      },
      {
        title: '子事项支持8级',
        active: true
      },
      {
        title: '单文件300M、文件夹20G',
        active: true
      },
      {
        title: '自定义视图10个',
        active: true
      },
      {
        title: '个人目标数量无限',
        active: true
      },
      {
        title: '批量操作、导出',
        active: true
      },
      {
        title: '自定义循环频率',
        active: true
      },
      {
        title: '1个',
        active: true,
        isSpace: 'free_space'
      }
    ]
  },
  {
    key: 'team',
    title: '团队会员',
    desc: '查看完整权益',
    bgColor: '#755EEF',
    borderColor: 'rgba(117, 94, 239, 0.4)',
    btnText: '开通使用',
    btnTextColor: '#fff',
    btnBgColor: 'linear-gradient(90deg, #7B5EEF 0%, #6248ED 100%)',
    btnBorderColor: 'none',
    money: '298',
    unit: '年/人',
    topText: '热门推荐',
    oldPrice: '',
    powerList: [
      {
        title: '所有个人会员能力',
        active: true
      },
      {
        title: '无限',
        active: true,
        isSpace: 'free_space'
      },
      {
        title: '无限',
        active: true,
        isSpace: 'professional_space'
      },
      {
        title: '项目数量无限',
        active: true
      },
      {
        title: '协作人数无限',
        active: true
      },
      {
        title: '空间外部协作人无限',
        active: true
      },
      {
        title: '存储容量（人数*10G)',
        active: true
      },
      {
        title: '空间脉络视图、关系视图',
        active: true
      },
      {
        title: '数据分析、成员日程',
        active: true
      },
      {
        title: '团队目标、团队模版库',
        active: true
      }
    ]
  },
  {
    key: 'custom',
    title: '私有化版',
    desc: '',
    bgColor: '#535179',
    borderColor: 'rgba(83, 81, 121, 0.4)',
    btnText: '联系客服',
    btnTextColor: '#535179',
    btnBgColor: '#535179',
    btnBorderColor: '#535179',
    money: '价格咨询',
    unit: '',
    moneyText: '添加销售为您制定方案',
    topText: '',
    oldPrice: '',
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

export const memberPowerStaticDataEN: IInfoType[] = [
  {
    key: 'free',
    title: 'Free',
    desc: 'All features',
    borderColor: 'rgba(187, 199, 225, 0.4)',
    bgColor: '#BBC7E1',
    btnText: '',
    btnTextColor: '#BBC7E1',
    btnBgColor: '#fff',
    btnBorderColor: '#BBC7E1',
    money: '0',
    unit: '',
    topText: '',
    oldPrice: '',
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
        title: '20 people in one task',
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
        isSpace: 'free_space'
      }
    ]
  },
  {
    key: 'personal',
    title: 'Premium',
    desc: 'All features',
    bgColor: '#FFBF5F',
    borderColor: 'rgba(255, 191, 95, 0.4)',
    btnText: 'Select',
    btnTextColor: '#FFFFFF',
    btnBgColor: 'linear-gradient(270.34deg, #FFB85E 2.92%, #FFD075 97.6%)',
    btnBorderColor: 'none',
    money: '48',
    unit: 'yr',
    topText: '',
    oldPrice: '¥128/yr',
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
        title: 'Unlimited Individual Goals',
        active: true
      },
      {
        title: 'Export to Excel',
        active: true
      },
      {
        title: 'One',
        active: true,
        isSpace: 'free_space'
      }
    ]
  },
  {
    key: 'team',
    title: 'Business',
    desc: 'All features',
    bgColor: '#755EEF',
    borderColor: 'rgba(117, 94, 239, 0.4)',
    btnText: 'Select',
    btnTextColor: '#fff',
    btnBgColor: 'linear-gradient(90deg, #7B5EEF 0%, #6248ED 100%)',
    btnBorderColor: 'none',
    money: '84',
    unit: 'yr',
    topText: 'POPULAR',
    oldPrice: '',
    powerList: [
      {
        title: 'All Premium features',
        active: true
      },
      {
        title: 'Unlimited',
        active: true,
        isSpace: 'free_space'
      },
      {
        title: 'Unlimited',
        active: true,
        isSpace: 'professional_space'
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
        title: 'Team Goals',
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
    desc: '',
    bgColor: '#535179',
    borderColor: 'rgba(83, 81, 121, 0.4)',
    btnText: 'Contact us',
    btnTextColor: '#535179',
    btnBgColor: '#535179',
    btnBorderColor: '#535179',
    money: '价格咨询',
    unit: '',
    moneyText: '添加销售为您制定方案',
    topText: '',
    oldPrice: '',
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
