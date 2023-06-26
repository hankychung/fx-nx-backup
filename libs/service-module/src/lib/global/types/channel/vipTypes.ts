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

export interface ITabs {
  key: string
  title: string
  clickFunc: () => void
  contextMenuTab: () => void
  contextMenuTxt: string
  contextMenuTo: () => void
  contextMenuMerge: () => void
}

export interface IOption {
  type: string
  pendantCut: string
  tabArr?: string[]
}

export enum OpenTpe {
  今日视图 = 'NOW_VIEW',
  月视图 = 'MONTH_VIEW'
}

export interface Ipos {
  x: number
  y: number
}
export interface IWideHigh {
  MINI: { w: number; h: number }
  NOW_VIEW: { w: number; h: number }
  MONTH_VIEW: { w: number; h: number }
}
export interface IlastScreenRate {
  w: number
  h: number
}
export interface ISettings {
  isOpen: boolean
  theme: string
  isFixed: boolean
  isAlwaysTop: boolean
  pos: Ipos
  lastScreenRate: IlastScreenRate
  lastScreenNum: number
  pendantCut: string
  wideHigh: IWideHigh
  isMerge: boolean
  opacity: number
  opacityFonts: number
  tabArr: string[]
  isMini: boolean
  isShrink: boolean
}
