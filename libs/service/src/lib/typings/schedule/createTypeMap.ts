import { MatterType, CreateType } from './const'

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
