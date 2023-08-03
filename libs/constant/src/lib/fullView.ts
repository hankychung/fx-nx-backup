export enum FullViewGroupByEnum {
  time = 'time',
  group = 'group',
  project = 'project',
  default = 'default'
}

export const FAKE_ID = 'FAKE_ID'

export const NO_PROJECT_ID = '0'

export type FullViewIdentity =
  | 10801
  | 10802
  | 10803
  | 10804
  | 10805
  | 10806
  | 10807

export type FullViewTaskType = 'task' | 'milestone' | 'project'

export type FullViewParamsQueryType =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | ''
  | undefined

export type FullViewBarMoveAction = 'progress' | 'end' | 'start' | 'move'

export type FullViewGanttContentMoveAction =
  | 'mouseenter'
  | 'mouseleave'
  | 'delete'
  | 'dblclick'
  | 'click'
  | 'select'
  | ''
  | FullViewBarMoveAction

export type FullViewTaskTypeInternal = FullViewTaskType | 'smalltask'

export enum FullViewIsFollowEnum {
  FOLLOW = 1, // 关注
  UNFOLLOW = 2 // 未关注
}

export enum FullViewScheduleShowEnum {
  UN_SHOW = 1, // 不显示
  SHOW // 显示
}

export enum FullViewConclusionEnum {
  EXIST = 1, // 有总结
  NULL // 无总结
}

export enum FullViewShowModeEnum {
  flat = 1,
  group
}

export enum FullViewModeEnum {
  Hour = 'Hour',
  QuarterDay = 'Quarter Day',
  HalfDay = 'Half Day',
  Day = 'Day',
  /** ISO-8601 week */
  Week = 'Week',
  Month = 'Month',
  QuarterYear = 'QuarterYear',
  Year = 'Year'
}

export enum FullViewDurationEnum {
  EXIST = 1, // 有时间
  NULL // 无时间
}

// 会议参与人状态
export enum MEETING_TAKER_STATE {
  wait = 10602, // 待开始
  processing = 10605, // 会议中
  completed = 10606, // 已完成
  canceled = 10607, // 已取消
  withdrawn = 10608 // 已撤回
}

// 会议参与人参与状态
export enum MEETING_PERSONAL_STATE {
  wait = 10601, // 待接受
  accepted = 10611, // 已接受
  refused = 10603, // 已拒绝
  leave = 10604 // 已请假
}

export enum NOTICE_PERSONAL_STATE {
  readed = 10408 // 已读
}

export enum FullViewTagWidgetColorEnum {
  red = '#FFE7E3',
  orange = '#FFF2D1',
  green = '#E1F8F6',
  blue = '#E4ECFF',
  purple = '#F3ECFF'
}

export enum FullViewGroupKeyEnum {
  MonthView = 'MonthView',
  ProjectDialog = 'ProjectDiscuss', // 项目讨论页
  TaskDialog = 'TaskDialog', // 事项讨论页
  FilePage = 'FilePage',
  ProjectList = 'ProjectList'
}
