/**
 * 0-非会员，1-个人会员，2-团队会员
 */
import { I18N } from '@flyele-nx/i18n'
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
    title: I18N.common.numberOfSubItems2,
    free: I18N.officialWebsite.multipleLayers2,
    personal: I18N.officialWebsite.multipleLayers,
    team: I18N.officialWebsite.multipleLayers
  },
  {
    key: 'taskTakerNumber',
    title: I18N.common.singleEventCoordination,
    free: I18N.officialWebsite.people,
    personal: I18N.officialWebsite.people2,
    team: I18N.common.infinite
  },
  {
    key: 'customView',
    title: I18N.common.custom_list,
    free: I18N.officialWebsite.individual7,
    personal: I18N.officialWebsite.individual6,
    team: I18N.officialWebsite.individual6
  },
  {
    key: 'tableHeader',
    title: I18N.officialWebsite.tableHeaderDisplay,
    free: I18N.officialWebsite.individual5,
    personal: I18N.common.infinite,
    team: I18N.common.infinite
  },
  {
    key: 'personalTarget',
    title: I18N.common.individual,
    free: I18N.officialWebsite.individual4,
    personal: I18N.common.infinite,
    team: I18N.common.infinite
  },
  {
    key: 'fileSave',
    title: I18N.officialWebsite.fileStorage,
    free: '2G',
    personal: '20G',
    team: '20G'
  },
  {
    key: 'fileUpdateSize',
    title: I18N.officialWebsite.onASingleFile,
    free: '50M',
    personal: '300M',
    team: false
  },
  {
    key: 'freeSpace',
    title: I18N.common.free_teamspace,
    free: I18N.officialWebsite.createJoin,
    personal: false,
    team: I18N.common.infinite
  },
  {
    key: 'specialSpace',
    title: I18N.common.pro_teamspace,
    free: '0',
    personal: false,
    team: I18N.common.infinite
  },
  {
    key: 'spaceProjectNum',
    title: I18N.officialWebsite.withinASingleSpace,
    free: I18N.officialWebsite.individual4,
    personal: false,
    team: I18N.common.infinite
  },
  {
    key: 'projectMember',
    title: I18N.common.numberOfProjectPersonnel,
    free: I18N.officialWebsite.individual4,
    personal: false,
    team: I18N.common.numberOfPeopleInTheSpace
  },
  {
    key: 'projectTask',
    title: I18N.common.itemsWithinTheProject,
    free: I18N.officialWebsite.individual3,
    personal: false,
    team: I18N.common.infinite
  },
  {
    key: 'spaceTask',
    title: I18N.officialWebsite.overallSpaceMatters,
    free: I18N.officialWebsite.individual2,
    personal: false,
    team: I18N.common.infinite
  },
  {
    key: 'spaceSave',
    title: I18N.officialWebsite.spaceStorage,
    free: '2G',
    personal: false,
    team: I18N.officialWebsite.numberOfPeopleG
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
