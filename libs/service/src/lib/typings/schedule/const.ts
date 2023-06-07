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
