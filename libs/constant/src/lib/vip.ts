/**
 * 0-非会员，1-个人会员，2-团队会员
 */
export enum VipTypeEnum {
  Poor = 0,
  Person = 1,
  Team = 2
}

export interface IIdentityData {
  key: string
  title: string // 标题
  desc?: string // 描述，tooltip显示
  free: string | boolean // 免费的权益
  personal: string | boolean // 个人会员的权益
  team: string | boolean // 团队会员的权益
  teamDesc?: string // 团队会员的权益， tooltip显示
}

/**
 * 会员权益
 */
export const identityData: IIdentityData[] = [
  {
    key: 'taskChildNumber',
    title: '子事项数',
    free: '20个，最多3层',
    personal: '200个，最多8层',
    team: '200个，最多8层'
  },
  {
    key: 'taskTakerNumber',
    title: '单一事项协作人',
    free: '20人',
    personal: '100人',
    team: '无限'
  },
  {
    key: 'customView',
    title: '自定义视图',
    free: '1个',
    personal: '10个',
    team: '10个'
  },
  {
    key: 'tableHeader',
    title: '表格表头显示',
    free: '5个',
    personal: '无限',
    team: '无限'
  },
  {
    key: 'personalTarget',
    title: '个人目标',
    free: '20个',
    personal: '无限',
    team: '无限'
  },
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
    team: false
  },
  {
    key: 'freeSpace',
    title: '免费空间',
    free: '创建1个，加入无限',
    personal: false,
    team: '无限'
  },
  {
    key: 'specialSpace',
    title: '专业空间',
    free: '0',
    personal: false,
    team: '无限'
  },
  {
    key: 'spaceProjectNum',
    title: '单一空间内项目个数',
    free: '20个',
    personal: false,
    team: '无限'
  },
  {
    key: 'projectMember',
    title: '项目人数',
    free: '20个',
    personal: false,
    team: '空间人数'
  },
  {
    key: 'projectTask',
    title: '项目内事项',
    free: '100个',
    personal: false,
    team: '无限'
  },
  {
    key: 'spaceTask',
    title: '空间事项总数',
    free: '500个',
    personal: false,
    team: '无限'
  },
  {
    key: 'spaceSave',
    title: '空间存储',
    free: '2G',
    personal: false,
    team: '人数*10G'
  }
]
