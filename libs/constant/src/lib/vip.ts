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

export const VipSmallIpcEvents = {
  // 获取本地设置
  GET_SETTINGS: /** 获取Setting */ 'GET_SETTINGS',
  // 开关
  OPEN_WIN: /** 打开小组件 */ 'OPEN_WIN',
  CLOSE_WIN: /** 关闭小组件 */ 'CLOSE_WIN',
  // 固定
  SET_FIXED_ON: /** 打开固定 */ 'SET_FIXED_ON',
  SET_FIXED_OFF: /** 关闭固定 */ 'SET_FIXED_OFF',
  // 置顶
  SET_ALWAYS_TOP_ON: 'SET_ALWAYS_TOP_ON',
  SET_ALWAYS_TOP_OFF: 'SET_ALWAYS_TOP_OFF',
  // 设置主题
  SET_THEME: 'SET_THEME',
  SET_THEME_CHANGE_BY_MAIN_SETTING: 'SET_THEME_CHANGE_BY_MAIN_SETTING',
  // 透明度-背景
  SET_OPACITY_BACKGROUND: 'SET_OPACITY_BACKGROUND',
  // 透明度-文字
  SET_OPACITY_FONT: 'SET_OPACITY_FONT',
  // 重置位置
  RESET_POS: 'RESET_POS',
  // 月视图大小/今日视图大小
  MONTH_VIEW_NOW_VIEW: 'MONTH_VIEW',
  // 窗口合并
  MONTH_VIEW_MERGE_NOW_VIEW: 'MONTH_VIEW_MERGE_NOW_VIEW',
  // 窗口独立
  ONLY_VIEW: 'ONLY_VIEW',
  // 改变tab
  SET_TAB: 'SET_TAB',
  // 是否存在独立窗体
  WIN_ONLY: 'WIN_ONLY',

  // 打开tab
  OPEN_TAB: 'OPEN_TAB',

  // 关闭tab
  CLOSE_TAB: 'CLOSE_TAB',

  // tabArr
  OPENTAB: 'OPENTAB',
  CLOSETAB: 'CLOSETAB',

  // MINI形态切换
  TOGGLEMINI: 'TOGGLEMINI',

  //消息提醒
  REMINDTASK: 'REMINDTASK',

  // 消息提醒向左
  REMINDTASKLEFT: 'REMINDTASKLEFT',

  // 消息提醒向右
  REMINDTASKRIGHT: 'REMINDTASKRIGHT',

  //  固定展开true 缩小false
  ISSHRIKN: 'ISSHRIKN'
}

export enum TabType {
  NOW_VIEW = '与"月视图"挂件合并',
  MONTH_VIEW = '与"今日"挂件合并'
}

export enum OpenTpe {
  今日视图 = 'NOW_VIEW',
  月视图 = 'MONTH_VIEW'
}
