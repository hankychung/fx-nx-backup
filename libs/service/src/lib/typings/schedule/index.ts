import {
  QuadrantValue,
  MatterType,
  RepeatConfigRepeatType,
  HolidayState,
  LOOP_MATTER,
  CreateType
} from './const'
import { TagModel } from '../tag'
import { TagWidgetColor } from '../tag/const'
import { SPACE_TYPE } from '../space/const'
import { PROJECT_STATE } from '../project/const'
import { IBaseProjectInfo } from '../project'
import { ScheduleTaskConst } from '../../../index'
import { FlowOperateType, FlowRangeType } from '../workflow/const'
import { ITaskFlowStepData } from '../workflow'

/**
 * proto.day_view.GetDayViewReply
 */
export interface IDayViewResponse {
  /**
   * 状态码
   */
  code?: number
  data?: IDayView
  /**
   * 请求错误结果集
   */
  errors?: { [key: string]: ApiError }
}

/**
 * proto.day_view.GetDayViewReply_DayViewData，日程首页数据
 */
export interface IDayView {
  /**
   * 自定义看板
   */
  custom_dashboard?: ProtoDayViewGetDayViewReplyCustomDashboard[]
  /**
   * 自定义看板标签
   */
  custom_dashboard_label?: ProtoDayViewGetDayViewReplyCustomDashboardLabel[]
  /**
   * 日程列表
   */
  schedule?: IScheduleTask[]
  /**
   * 日程列表已完成的总数
   */
  schedule_complete_total?: number
  /**
   * 日程列表数据总数
   */
  schedule_total?: number
  /**
   * 系统看板
   */
  system_dashboard?: ProtoDayViewGetDayViewReplySystemDashboard[]
  system_dashboard_count?: ProtoDayViewGetDayViewReplySystemDashboardCount
  weather?: ProtoDayViewGetDayViewReplyWeather
}

/**
 * proto.day_view.GetDayViewReply_CustomDashboard，自定义看板
 */
export interface ProtoDayViewGetDayViewReplyCustomDashboard {
  application_id?: string
  application_name?: string
  biz?: Biz
  /**
   * 创建时间
   */
  create_at?: number
  /**
   * 创建人id
   */
  creator_id?: string
  /**
   * 重复次数
   */
  cycle?: number
  /**
   * 重复开始日期
   */
  cycle_date?: string
  /**
   * 派发id
   */
  dispatch_id?: string
  /**
   * 结束循环的时间
   */
  end_repeat_at?: number
  /**
   * 截止时间
   */
  end_time?: number
  /**
   * 截止时间全天事项
   */
  end_time_full_day?: number
  /**
   * 启动时间
   */
  execute_at?: number
  /**
   * 完成时间
   */
  finish_time?: number
  flow_step_complete_at?: number
  flow_step_id?: string
  flow_step_join?: boolean
  flow_step_name?: string
  flow_step_user_count?: number
  /**
   * 是否关注
   */
  has_follow?: boolean
  /**
   * 身份
   */
  identity?: number
  /**
   * 是否是责任人
   */
  is_admin?: boolean
  /**
   * 事项类型
   */
  matter_type?: MatterType
  /**
   * 操作状态
   */
  operate_state?: number
  /**
   * 个人状态
   */
  personal_state?: number
  /**
   * 项目ID
   */
  project_id?: string
  remind_at?: RemindAt
  /**
   * 重复id
   */
  repeat_id?: string
  /**
   * 循环事项数据
   */
  repeat_list?: RepeatList[]
  /**
   * 重复类型
   */
  repeat_type?: number
  /**
   * 日程是否隐藏
   */
  schedule_hide?: boolean
  /**
   * 开始时间
   */
  start_time?: number
  /**
   * 开始时间全天事项
   */
  start_time_full_day?: number
  /**
   * 状态
   */
  state?: number
  /**
   * 事项id
   */
  task_id?: string
  /**
   * 事项标题
   */
  title?: string
  widget?: Widget
  /**
   * 空间ID
   */
  workspace_id?: string
}

/**
 * .Biz
 */
export interface Biz {
  matter_state?: MatterState
  /**
   * 自定义视图的时间状态 1未开始 2今日开始 3今日截止 4进行中 5延期中 6已完成
   */
  time_state?: number
  /**
   * 时间字符串
   */
  time_str?: string
  /**
   * 时间字符串前缀
   */
  time_str_prefix?: string
}

/**
 * .MatterState
 */
export interface MatterState {
  is_accepted?: boolean
  is_alert?: boolean
  is_calendar?: boolean
  is_cancel?: boolean
  is_child_task?: boolean
  is_creator?: boolean
  is_end?: boolean
  is_finish?: boolean
  is_for_leave?: boolean
  is_gadget?: boolean
  is_ing?: boolean
  is_master_task?: boolean
  is_meeting?: boolean
  is_notice?: boolean
  is_read?: boolean
  is_rejected?: boolean
  is_task?: boolean
  is_time_collect?: boolean
  is_todo?: boolean
  is_unread?: boolean
  is_wait_accept?: boolean
  is_wait_start?: boolean
  is_withdraw?: boolean
}

/**
 * .RemindAt，事项的时间提醒
 */
export interface RemindAt {
  /**
   * 自定义提醒
   */
  alone_remind?: number[]
  /**
   * 结束时间提醒
   */
  end_remind?: number[]
  /**
   * 最大自定义提醒数量，最大5
   */
  max_alone_total?: number
  /**
   * 开始时间提醒
   */
  start_remind?: number[]
}

/**
 * .RepeatList，循环列表
 */
export interface RepeatList {
  /**
   * 是否变更过
   */
  change?: boolean
  /**
   * 事项完成时间
   */
  complete_at?: number
  /**
   * 循环次数
   */
  cycle?: number
  /**
   * 循环日期
   */
  cycle_date?: string
  /**
   * 截止时间
   */
  end_time?: number
  /**
   * 截止时间全天事项
   */
  end_time_full_day?: number
  /**
   * 个人完成时间
   */
  finish_time?: number
  repeat_change?: RepeatChange
  /**
   * 完成循环用户
   */
  repeat_finishes?: RepeatFinishes[]
  /**
   * 循环id，100000001为变更记录
   */
  repeat_id?: string
  /**
   * 开始时间
   */
  start_time?: number
  /**
   * 开始时间全天事项
   */
  start_time_full_day?: number
}

/**
 * .RepeatChange，循环的更改信息
 */
export interface RepeatChange {
  /**
   * 内容
   */
  content?: string
  /**
   * 创建人
   */
  creator_id?: string
}

/**
 * .RepeatFinishes，循环的完成情况
 */
export interface RepeatFinishes {
  /**
   * 完成时间
   */
  finish_time?: number
  /**
   * 用户id
   */
  user_id?: string
}

/**
 * .Widget，事项组件
 */
export interface Widget {
  /**
   * 地点
   */
  execute_addr?: boolean
  /**
   * 提醒时间控件
   */
  remind?: boolean
  /**
   * 循环
   */
  repeat?: boolean
  /**
   * 时间控件
   */
  time?: boolean
}

/**
 * proto.day_view.GetDayViewReply_CustomDashboardLabel，自定义看板的标签
 */
export interface ProtoDayViewGetDayViewReplyCustomDashboardLabel {
  content?: string
  id?: string
  title?: string
}

export interface IRepeatConfig {
  ignore_holiday?: number // 1->跳过节假日
  repeat_date?: number[] | string[] // 循环日期，repeat_type=1时忽略，每周一，二传[1, 2]，每月2号10号传[2, 10]，每年几月几号传["02-14", "05-18"]
  repeat_interval?: number // 循环间隔
  repeat_type?: RepeatConfigRepeatType // 循环类型
}

/**
 * .Schedule，日程列表
 */
export interface IScheduleTask {
  application_id?: string
  application_name?: string
  biz?: Biz
  category?: number
  complete_at?: number
  create_at: number
  creator_id: string
  cycle?: number
  cycle_date?: string
  dispatch_id: string
  end_repeat_at?: number
  end_time?: number
  end_time_full_day?: number
  execute_at?: number
  finish_time?: number
  flow_step_complete_at?: number
  flow_step_id?: string
  flow_step_join?: boolean
  flow_step_name?: string
  flow_step_user_count?: number
  flow_step_user_complete?: number // 当前步骤用户完成时间
  has_child?: boolean
  has_follow?: boolean
  is_follow?: boolean // 这个和 has_follow 其实需要统一一个，估计是不同的事项列表接口返回的字段不同
  identity?: number
  invite_id?: string
  invite_name?: string
  is_admin?: boolean
  matter_type: MatterType
  operate_state?: number
  original_end_time?: number
  original_start_time?: number
  parent_id?: string
  parents?: Parents[]
  personal_remind_at?: PersonalRemindAt
  personal_state?: number
  project_id?: string
  project_name?: string
  ref_note_total?: number
  ref_record_total?: number
  ref_task_id: string
  remind_at?: RemindAt
  repeat_delay_total?: number
  repeat_id?: string
  repeat_list?: RepeatList[]
  repeat_config?: IRepeatConfig
  repeat_type?: number
  start_time?: number
  start_time_full_day?: number
  state: number
  tags?: ScheduleTag[]
  taker_id?: string
  takers?: Taker[]
  title: string
  topmost_at?: number
  widget?: Widget
  workspace_id?: string
  workspace_info?: WorkspaceInfo
  priority_level?: QuadrantValue
  ws_type?: SPACE_TYPE
  hide?: boolean
  schedule_hide?: boolean
}

/**
 * .Parents，父事项相关
 */
export interface Parents {
  /**
   * 父事项创建人
   */
  creator_id?: string
  /**
   * 父级事项id
   */
  task_id?: string
  /**
   * 父事项名称
   */
  title?: string
}

/**
 * .PersonalRemindAt，个人的时间提醒
 */
export interface PersonalRemindAt {
  /**
   * 结束时间延期提醒
   */
  end_delay_remind?: number
  /**
   * 启动时间提醒
   */
  execute_remind?: number
  /**
   * 开始时间延期提醒
   */
  start_delay_remind?: number
}

/**
 * .ScheduleTag，日程标签
 */
export interface ScheduleTag extends TagModel {
  /**
   * 标签颜色
   */
  color: TagWidgetColor
  /**
   * 标签名字
   */
  name: string
  /**
   * 标签id
   */
  tag_id?: string
}

/**
 * .Taker，协作人相关
 */
export interface Taker {
  /**
   * 接受时间
   */
  accept_at?: number
  /**
   * 是否主动触发
   */
  active_trigger?: number
  /**
   * 头像
   */
  avatar?: string
  biz?: Biz
  /**
   * 创建时间
   */
  create_at?: number
  /**
   * 任务创建人ID
   */
  creator_id?: string
  /**
   * 派发任务ID
   */
  dispatch_id?: string
  /**
   * 启动时间
   */
  execute_at?: number
  /**
   * 完成时间
   */
  finish_time?: number
  /**
   * 事项参与人身份
   */
  identity?: number
  /**
   * 邀请人创建时间
   */
  invite_create_at?: number
  /**
   * 邀请人ID
   */
  invite_id?: string
  /**
   * 邀请人名称
   */
  invite_name?: string
  /**
   * 邀请人类型，flyele，wechat，manuallyJoin
   */
  invite_type?: string
  /**
   * 是否责任人
   */
  is_admin?: boolean
  /**
   * 是否浏览，1->是
   */
  is_view?: number
  /**
   * 空间外部成员标识
   */
  is_workspace_extend_member?: boolean
  /**
   * 名称
   */
  nick_name?: string
  /**
   * 事项参与人操作状态
   */
  operate_state?: number
  /**
   * 原始名称
   */
  original_name?: string
  /**
   * 事项参与人参与状态
   */
  personal_state?: number
  /**
   * 拼音
   */
  pinyin?: string
  /**
   * 备注，拒绝或者请假备注
   */
  reason?: string
  /**
   * 主任务ID
   */
  ref_task_id?: string
  /**
   * 设置责任人时间
   */
  set_admin_at?: number
  /**
   * 事项参与人状态
   */
  state?: number
  /**
   * 承接人ID
   */
  taker_id?: string
  /**
   * 更新时间
   */
  update_at?: number
}

/**
 * .WorkspaceInfo
 */
export interface WorkspaceInfo {
  /**
   * 空间ID
   */
  workspace_id?: string
  /**
   * 空间名称
   */
  workspace_name?: string
  /**
   * 空间等级
   */
  ws_level?: number
  /**
   * 空间类型
   */
  ws_type?: number
}

/**
 * proto.day_view.GetDayViewReply_SystemDashboard，系统看板列表
 */
export interface ProtoDayViewGetDayViewReplySystemDashboard {
  complete_at?: number
  create_at?: number
  creator_id?: string
  cycle?: number
  cycle_date?: string
  dispatch_id?: string
  end_repeat_at?: number
  end_time?: number
  end_time_full_day?: number
  execute_at?: number
  finish_time?: number
  flow_step_complete_at?: number
  flow_step_complete_total?: number
  flow_step_count_total?: number
  flow_step_id?: string
  flow_step_join?: boolean
  flow_step_name?: string
  flow_step_user_count?: number
  has_follow?: boolean
  identity?: number
  is_admin?: number
  last_active_at?: number
  matter_type?: MatterType
  project_id?: string
  remind_at?: RemindAt
  repeat_id?: string
  repeat_list?: RepeatList[]
  repeat_type?: number
  schedule_hide?: boolean
  score?: number
  start_time?: number
  start_time_full_day?: number
  takers?: Taker[]
  task_id?: string
  title?: string
  workspace_id?: string
  workspace_info?: WorkspaceInfo
}

/**
 * proto.day_view.GetDayViewReply_SystemDashboardCount，系统看板总数
 */
export interface ProtoDayViewGetDayViewReplySystemDashboardCount {
  /**
   * 派发-未完成总数
   */
  dispatch_total?: number
  /**
   * 关注-未完成总数
   */
  follow_total?: number
  /**
   * 我接受-未完成总数
   */
  join_total?: number
  /**
   * 个人-未完成总数
   */
  self_total?: number
  /**
   * 待安排-总数
   */
  wait_arrange_total?: number
}

/**
 * proto.day_view.GetDayViewReply_Weather，天气
 */
export interface ProtoDayViewGetDayViewReplyWeather {
  /**
   * 当前天气code 0-38 99是没有找到 @inject_tag: json:"code"
   */
  code?: string
  /**
   * 鸡汤文
   */
  message?: string
  /**
   * 温度
   */
  temperature?: string
  /**
   * 当前天气文本
   */
  text?: string
  /**
   * 0 周日 1-6 周一 - 周六 @inject_tag: json:"week_day"
   */
  week_day?: number
  /**
   * 风向级别描述文字
   */
  wind_describe?: string
}

/**
 * .ApiError，接口请求错误时的错误信息
 */
export interface ApiError {
  /**
   * 错误码
   */
  code?: number
  /**
   * 错误信息
   */
  message?: string
  /**
   * 错误附加数据
   */
  metadata?: { [key: string]: string }
  /**
   * 错误原因
   */
  reason?: string
}

/**
 * 节假日
 */
export interface IHoliday {
  date: string
  state: HolidayState
}

export interface IRelation {
  children?: Taker[]
  child_total?: number
  parents?: Array<{ task_id: string; application_id?: string; title: string }>
  comment_total?: number
  file_total?: number
  gadget_meeting_total?: number
  gadget_notice_total?: number
  gadget_time_collect_total?: number
  gadget_todo_total?: number
  important_total?: number
  is_red_dot?: boolean
  note_total?: number
  record_total?: number
  taker_total?: number
  unread_total?: number
  notice_float?: Array<{
    task_id: string
    title: string
    detail: string
  }>
  project?: {
    creator_id: string
    workspace_state?: number
    project_state?: PROJECT_STATE
  } & IBaseProjectInfo
  is_follow?: boolean

  operate_type?: FlowOperateType
}

export interface IChildren {
  children?: IChildren[]
  /** 最大长度 2500 */
  detail?: string //
  end_repeat_at?: number
  end_time?: number
  /** 截止时间全天事项，1->否，2->是 */
  end_time_full_day?: 1 | 2
  /**  是否派发 0 -> 否，1 -> 是 */
  is_dispatch?: 0 | 1 //
  remind_at?: IScheduleTask['remind_at']
  /** 重复周期，0->永不，1->每天，2->每周，3->每两周，4->工作日，5->非工作日，6->每月 */
  repeat_type?: LOOP_MATTER
  repeat_config?: IRepeatConfig // 循环设置
  start_time?: number
  /** 开始时间全天事项，1->否，2->是 */
  start_time_full_day?: 1 | 2
  /** 邀请的协作人 */
  takers?: string[]
  title: string
  widget?: any
  /** 这个字段接口上没有，只用在前端判断然后手动掉绑定接口 */
  tagIds?: string[]
  temp_id?: string
  files?: {
    id: string
    origin: string
    name: string
    size: string
  }[]
  operate_type?: FlowOperateType
  priority_level?: QuadrantValue
}

export interface ICreateParams {
  detail?: string
  end_collect?: 1 | 2 | 3 // 1->2小时后，2->6小时后，3->1天后
  end_time?: number
  execute_addr?: string
  files?: Array<{ id: string; name: string; origin: string; size: string }>
  is_checkbox?: 0 | 1 // 是否多选 0->否，1->是
  is_dispatch: 0 | 1 // 是否派发 0 -> 否，1 -> 是
  matter_type: ScheduleTaskConst.MatterType // 任务类型 10701 -> 事项， 10702 -> 会议， 10703 -> 时间征集
  remind_at?: IScheduleTask['remind_at']
  remind_user_id?: string
  reminder_time?: number[]
  start_time?: number
  task_id?: string
  priority_level?: QuadrantValue
  time_collects?: any
  title: string
  parent_id?: string // 父事项id
  widget?: any
  children?: IChildren[]
  start_time_full_day?: 1 | 2 // 开始时间全天事项，1->否，2->是
  end_time_full_day?: 1 | 2 // 截止时间全天事项，1->否，2->是
  project_id?: string // 关联项目id
  category?: 0 | 1 | 2 // 0=主事项, 1=小工具，2=子事项
  end_repeat_at?: number // 结束重复时间戳，当天23:59:59时间
  repeat_type?: LOOP_MATTER
  repeat_config?: IRepeatConfig // 循环设置
  group_id?: string // 分组id
  _tagIds?: string[] // 已选中标签 id，用于埋点数据
  _tagArr?: TagModel[] // 标签对象数组，用于埋点数据
  _create_type?: CreateType // 创建类型，用于埋点数据
  _meeting_remind_data?: string[] // 会议提醒时间，用于埋点数据
  ancestor_id?: string // 所有的父id 暂时仅给埋点使用，因为那个parentId是不准确的

  /** 2.1新增 **/
  application_id?: string // 应用id 应用必传
  task_flow_steps?: ITaskFlowStepData[] // 工作流
  takers?: string[] // 邀请的协作人
  operate_type?: FlowOperateType
  execute_at?: number
}
