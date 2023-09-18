import { I18N } from '@flyele-nx/i18n'
export enum QuadrantValue {
  no_important_no_urgent = 1,
  urgent_no_important,
  important_no_urgent,
  important_urgent
}

export const QuadrantText = {
  [QuadrantValue.important_urgent]: I18N.common.urgent_and_important,
  [QuadrantValue.important_no_urgent]: I18N.common.not_urgent_and_important,
  [QuadrantValue.urgent_no_important]: I18N.common.urgent_and_unimportant,
  [QuadrantValue.no_important_no_urgent]: I18N.common.not_urgent_and_unimportant
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

export enum CANCEL_TASK_STATE {
  DEFAULT = -1,
  CANCEL_JOIN = 10405, // 事项 我参与 取消事项
  CANCEL_DISPATCH = 10303, // 事项 我派发 取消事项
  CANCEL_MEETING = 10504 // 会议 取消会议
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

// 事项创建人状态
export enum MATTER_CREATOR_STATE {
  dispatched = 10301, // 已派发
  completed = 10302, // 已完成
  canceled = 10303 // 已取消
}

// 会议创建人状态
export enum MEETING_CREATOR_STATE {
  wait = 10501, // 待开始
  processing = 10502, // 会议中
  completed = 10503, // 已完成
  canceled = 10504 // 已取消
}

// 事项参与人状态
export enum MATTER_TAKER_STATE {
  processing = 10402, // 处理中
  completed = 10404, // 已完成
  canceled = 10405, // 已取消
  withdrawn = 10406 // 已撤回
}

// 事项参与人被取消撤回状态
export enum MATTER_OPERATE_STATE {
  canceled = 10407, // 被取消
  withdrawn = 10408 // 被撤回
}

// 会议参与人被取消撤回状态
export enum MEETING_OPERATE_STATE {
  canceled = 10609, // 被取消
  withdrawn = 10610 // 被撤回
}

// 事项参与人参与状态
export enum MATTER_PERSONAL_STATE {
  wait = 10401,
  accepted = 10409,
  refused = 10403
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
  [MatterType.matter]: I18N.common.task,
  [MatterType.meeting]: I18N.common.meeting,
  [MatterType.timeCollect]: I18N.common.timeCollection,
  [MatterType.notice]: I18N.common.announcement,
  [MatterType.todo]: I18N.common.to_do,
  [MatterType.timeRemind]: I18N.common.timeReminder,
  [MatterType.calendar]: I18N.common.calendarImport,
  [MatterType.project]: I18N.common.project,
  [MatterType.target]: I18N.common.objectives
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
  [LOOP_MATTER.noLoop]: I18N.common.no_repeat,
  [LOOP_MATTER.everDay]: I18N.common.daily,
  [LOOP_MATTER.weekly]: I18N.common.weekly,
  [LOOP_MATTER.everyFortnight]: I18N.common.every_2_week,
  [LOOP_MATTER.weekdays]: I18N.common.weekday,
  [LOOP_MATTER.nonWork]: I18N.common.nonWorkingDays,
  [LOOP_MATTER.monthly]: I18N.common.monthly,
  [LOOP_MATTER.custom]: I18N.common.custom
}

export enum CreateType {
  MATTER = 'MATTER', // 普通创建事项
  APP_MATTER = 'APP_MATTER', // 应用普通创建事项
  MEETING = 'MEETING',
  TOOL_NOTICE = 'TOOL_NOTICE',
  TOOl_MEETING = 'TOOl_MEETING',
  TOOL_TODO = 'TOOL_TODO',
  TOOL_COLLECT = 'TOOL_COLLECT',
  PROJECT = 'PROJECT',
  UNKNOWN = 'UNKNOWN',
  TARGET = 'TARGET',
  KR = 'KR'
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

// 埋点使用
export enum SensorCreateType {
  detail = '详细创建',
  quick = '快速创建',
  import = '导入创建',
  copy = '复制创建'
}

export const CreateTypeToMatterType = {
  [CreateType.MATTER]: MatterType.matter,
  [CreateType.APP_MATTER]: MatterType.matter, // 应用事项

  [CreateType.TOOL_TODO]: MatterType.todo,
  [CreateType.MEETING]: MatterType.meeting,
  [CreateType.TOOl_MEETING]: MatterType.meeting,
  [CreateType.TOOL_NOTICE]: MatterType.notice,
  [CreateType.TOOL_COLLECT]: MatterType.matter, // 为了处理ts枚举报错加上，无需处理
  [CreateType.PROJECT]: MatterType.matter, // 为了处理ts枚举报错加上，无需处理4
  [CreateType.TARGET]: MatterType.matter, // 为了处理ts枚举报错加上，无需处理4
  [CreateType.KR]: MatterType.matter, // 为了处理ts枚举报错加上，无需处理4
  // 多出来的
  [CreateType.UNKNOWN]: MatterType.project
}

export const MatterTypeToCreateType = {
  [MatterType.matter]: CreateType.MATTER,
  [MatterType.todo]: CreateType.TOOL_TODO,
  [MatterType.meeting]: CreateType.MEETING,
  [MatterType.notice]: CreateType.TOOL_NOTICE,
  [MatterType.timeCollect]: CreateType.TOOL_COLLECT, // 为了处理ts枚举报错加上，无需处理
  [MatterType.target]: CreateType.TARGET,
  [MatterType.timeRemind]: CreateType.UNKNOWN,
  [MatterType.calendar]: CreateType.UNKNOWN,

  10708: CreateType.UNKNOWN
}
