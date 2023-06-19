export enum QuadrantValue {
  no_important_no_urgent = 1,
  urgent_no_important,
  important_no_urgent,
  important_urgent
}

export const QuadrantText = {
  [QuadrantValue.important_urgent]: '重要紧急',
  [QuadrantValue.important_no_urgent]: '重要不紧急',
  [QuadrantValue.urgent_no_important]: '紧急不重要',
  [QuadrantValue.no_important_no_urgent]: '不紧急不重要'
}

export const QuadrantBefore = {
  [QuadrantValue.important_urgent]: '!!!',
  [QuadrantValue.important_no_urgent]: '!!',
  [QuadrantValue.urgent_no_important]: '!',
  [QuadrantValue.no_important_no_urgent]: '-'
}

export const QuadrantColor = {
  [QuadrantValue.important_urgent]: '#E65454',
  [QuadrantValue.important_no_urgent]: '#E69448',
  [QuadrantValue.urgent_no_important]: '#7E7FF8',
  [QuadrantValue.no_important_no_urgent]: '#989F9F'
}

// 事项身份
export enum IDENTITY {
  matterCreator = 10801, // 事项创建人(我参与)
  meetingCreator = 10802, // 会议创建人
  meetingTaker = 10803, // 会议参与人
  // * 这里与MatterIdentity不一致
  matterDistribute = 10804, // 事项创建人（我派发）
  //
  matterTaker = 10805, // 事项参与人
  collectCreator = 10806, // 时间征集创建人
  collectTaker = 10807, // 时间征集参与人
  stNoticeCreator = 10808, // 小工具公告创建人
  stNoticeTaker = 10809, // 小工具公告参与人
  stTodoCreatorAndTaker = 10810, // 小工具待办创建人与参与人
  stTodoCreator = 10811, // 小工具待办创建人
  stTodoTaker = 10812 // 小工具待办参与人
}

export enum MatterType {
  matter = 10701, // 事项
  meeting = 10702, // 会议
  timeCollect = 10703, // 时间征集
  notice = 10704, // 公告
  todo = 10705, // 待办
  timeRemind = 10706, // 时间提醒
  calendar = 10707, // 日历导入
  project = 10708, // 项目
  target = 10001 // 目标
}

export const MatterTypeLabel: {
  [key: number]: string
} = {
  [MatterType.matter]: '事项',
  [MatterType.meeting]: '会议',
  [MatterType.timeCollect]: '时间征集',
  [MatterType.notice]: '公告',
  [MatterType.todo]: '待办',
  [MatterType.timeRemind]: '时间提醒',
  [MatterType.calendar]: '日历导入',
  [MatterType.project]: '项目',
  [MatterType.target]: '目标'
}

// 循环类型 （新版）
// 其实和旧版很像 但是 就是少了几个，多了几个
export enum RepeatConfigRepeatType {
  EVERY_DAY = 1, // 每天
  EVERY_WEEK = 2, // 每周
  EVERY_MONTH = 6, // 每月
  EVERY_YEAR = 7 // 每年
}

// 循环事项选项 （旧版）
export enum LOOP_MATTER {
  noLoop = 0, // 不循环
  everDay, // 每天
  weekly, // 每周
  everyFortnight, // 每两周
  weekdays, // 工作日
  nonWork, // 非工作日
  monthly, // 每月
  custom = 999 // 自定义循环
}

export const LOOP_MATTER_LABEL: { [key: number]: string } = {
  [LOOP_MATTER.noLoop]: '不循环',
  [LOOP_MATTER.everDay]: '每天',
  [LOOP_MATTER.weekly]: '每周',
  [LOOP_MATTER.everyFortnight]: '每2周',
  [LOOP_MATTER.weekdays]: '工作日',
  [LOOP_MATTER.nonWork]: '非工作日',
  [LOOP_MATTER.monthly]: '每月',
  [LOOP_MATTER.custom]: '自定义循环'
}

export enum AlwaysFinishTime {
  value = 2114351999
}

export enum HolidayState {
  FURLOUGH = 1, // 放假
  DUTY // 补班
}

/** 事项类型 */
export enum CATEGORY {
  /** 主事项 */
  mainMatter,
  /** 小工具: 目前是待办、会议 */
  smallTool,
  /** 子事项 */
  childMatter
}

// 普通字数
export const NORMAL_LEN = 16

// 最大标题字数
export const MAX_TITLE_LEN = 300

// 最大背景字数
export const MAX_BACKGROUND_LEN = 1500

// 非法字符
export const InvaildChar = ['@', '#', '*', '/', '\\', '<', '>']
