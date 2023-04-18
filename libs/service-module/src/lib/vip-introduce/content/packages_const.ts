import { IInfoType } from '../types'

export const memberPowerStaticData: IInfoType[] = [
  {
    key: 'free',
    title: '免费账户',
    desc: '查看完整权益',
    borderColor: '#BBC7E1',
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
        title: '永久免费',
        active: true
      },
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
        title: '日、周、月、全量视图',
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
        title: '事项协作人数20人',
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
        title: '自定义视图1个',
        active: true
      },
      {
        title: '个人目标20个',
        active: true
      },
      {
        title: '免费团队空间1个',
        active: true
      },
      {
        title: '全量表头数量5个',
        active: true
      }
    ]
  },
  {
    key: 'personal',
    title: '个人会员',
    desc: '查看完整权益',
    bgColor: '#FFBF5F',
    borderColor: '#FFBF5F',
    btnText: '开通使用',
    btnTextColor: '#FFFFFF',
    btnBgColor: 'linear-gradient(270.34deg, #FFB85E 2.92%, #FFD075 97.6%)',
    btnBorderColor: 'none',
    money: '12',
    unit: '月',
    topText: '',
    oldPrice: '¥128/年',
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
        title: '个人文件容量50G',
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
    desc: '查看完整权益',
    bgColor: '#755EEF',
    borderColor: '#755EEF',
    btnText: '开通使用',
    btnTextColor: '#fff',
    btnBgColor: 'linear-gradient(90deg, #7B5EEF 0%, #6248ED 100%)',
    btnBorderColor: 'none',
    money: '298',
    unit: '年',
    topText: '热门推荐',
    oldPrice: '',
    powerList: [
      {
        title: '包含所有个人会员能力',
        active: true
      },
      {
        title: '支持创建无限的专业团队空间',
        active: true
      },
      {
        title: '支持创建无限的项目',
        active: true
      },
      {
        title: '协作人数无限',
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
      },
      {
        title: '团队应用库',
        active: true
      },
      {
        title: '……',
        active: false
      }
    ]
  },
  {
    key: 'custom',
    title: '私有化版',
    desc: '',
    bgColor: '#535179',
    borderColor: '#535179',
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
