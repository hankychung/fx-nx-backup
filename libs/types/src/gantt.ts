import {
  IDENTITY,
  LOOP_MATTER,
  MATTER_CREATOR_STATE,
  MATTER_OPERATE_STATE,
  MATTER_PERSONAL_STATE,
  MATTER_TAKER_STATE,
  MEETING_CREATOR_STATE,
  MEETING_OPERATE_STATE,
  MatterType,
  QuadrantValue,
  VipTypeEnum
} from '@flyele-nx/constant'
import { IRepeatConfig, MatterState } from './schedule'
import { IBaseProjectInfo } from './project'
import { TagModel } from './tag'

export interface ICellProps {
  data: Task
  userId?: string
}

export const FAKE_ID = 'FAKE_ID'

export const NO_PROJECT_ID = '0'

export type IRepeatTreeItem = {
  parent_id: string
  repeat_id: string
  task_id: string
  ref_task_id?: string // 这里是不会有这个字段的，只是因为ITaskItem的ref_task_id问题
  title: string
}

type ParentsItem = {
  task_id: string
  title: string
}

export interface ITaskItem {
  id?: string
  application_id?: string // 应用ID
  application_name?: string //应用名称
  flow_step_id?: string //当前工作流ID
  flow_step_name?: string //当前工作流名称
  flow_step_user_complete?: number // 当前步骤用户完成时间
  flow_step_user_count?: number
  dispatch_id: string
  ref_task_id: string // 二选一
  matter_type:
    | MatterType
    | MatterType.matter
    | MatterType.meeting
    | MatterType.todo
  title: string
  creator_id: string
  taker_id: string
  start_time: number
  original_end_time?: number
  original_start_time?: number
  end_time: number
  remind_at: { start_remind: number }
  finish_time: number
  repeat_finish_time?: number
  complete_at?: number //2.0新增全部协作人完成才完成
  identity: number
  state: number
  personal_state: number
  operate_state?: number
  create_at: number
  execute_at: number
  invite_name: string
  _compareVal: number
  task_id: string
  invite_id: string
  parent_id?: string
  parents?: ParentsItem[]
  realParentId?: string // 直属上级事项
  has_child: boolean
  children?: ITaskItem[]
  checkChildren?: ITaskItem[]
  fromInvite?: boolean
  has_follow?: boolean
  is_follow?: boolean
  priority_level?: QuadrantValue
  // 1否, 2是
  start_time_full_day?: 1 | 2
  end_time_full_day?: 1 | 2
  is_admin?: number
  tags?: ITag[]
  repeat_delay_total?: number
  // 本地增量更新
  diff?: boolean
  takers: ITakersItemIds[]
  deleteChild?: boolean

  repeatCheck?: boolean

  target_time?: number

  topmost_at?: number

  //根据跨天需求新增
  crossItem?: boolean
  lineEnd?: boolean
  lineStart?: boolean
  ws_type?: number
  // 动画
  animation?: {
    name?: string
    x?: number
    y?: number
    repeat?: number
    scale?: number
    opacity?: number
    duration?: number
    delay?: number
  }
  category?: number
  noticeId?: string
  project_id?: string
  project_name?: string
  hide?: boolean
  repeat_id?: string
  ref_type: 'project' | 'task'
  end_repeat_at?: number // 循环截止时间
  repeat_type?: LOOP_MATTER
  repeat_list?: IRepeatListItem[]
  cycle_date?: string
  cycle?: number
  last_cycle?: number
  doNotCheckParent?: boolean
  nick_name?: string
  isBatchOperation?: boolean
  hasParent?: boolean
  repeatlist?: boolean // 详情历史循环标志
  schedule_hide?: boolean
  checkExist?: boolean
  fullDoseIgnore?: boolean
  workspace_id?: string // 空间id 团队空间日程那边加来用的
  widget?: any
  flow_step_complete_at?: number // 所处步骤的完成时间
  flow_step_join?: boolean // 是否加入当前步骤
  doNotRenderList?: boolean
  task_tree_complete_total?: number //子事项已完成数量
  task_tree_total?: number //子事项总数
  repeat_config?: IRepeatConfig
}
export type Identity = 10801 | 10802 | 10803 | 10804 | 10805 | 10806 | 10807

export type ITakersItemIds = {
  taker_id: string
  is_admin?: boolean
  identity?: Identity
  finish_time?: number
  accept_at?: number
  create_at?: number
  dispatch_id: string
  personal_state?: number
  state?: number
}

interface IRepeatListItem {
  change?: boolean
  cycle: number
  repeat_finishes?: Array<{
    user_id: string
    finish_time: number
    active_trigger: 1
  }>
  repeat_id: string
  start_time?: number
  end_time?: number
  end_time_full_day?: 1 | 2
  start_time_full_day?: 1 | 2
  cycle_date: string

  // 为了方便额外存储
  task_id?: string

  overide?: boolean
  last_cycle?: number
}

export type TreeItem<T = ITaskItem> = T & {
  children?: Array<TreeItem<T>>
  open?: boolean
  cycle?: number
}

export enum ViewMode {
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
export type TaskType = 'task' | 'milestone' | 'project'
export interface Task extends FullViewTask {
  id: string
  type: TaskType
  name: string
  start: Date
  end: Date
  /**
   * From 0 to 100
   */
  progress?: number
  styles?: {
    backgroundColor?: string
    backgroundSelectedColor?: string
    progressColor?: string
    progressSelectedColor?: string
  }
  isDisabled?: boolean
  project?: string
  dependencies?: string[]
  hideChildren?: boolean
  displayOrder?: number
}

export interface EventOption {
  /**
   * Time step value for date changes.
   */
  timeStep?: number
  /**
   * Invokes on bar select on unselect.
   */
  onSelect?: (task: Task, isSelected: boolean) => void
  /**
   * Invokes on bar double click.
   */
  onDoubleClick?: (task: Task) => void
  /**
   * Invokes on bar click.
   */
  onClick?: (task: Task) => void
  /**
   * Invokes on end and start time change. Chart undoes operation if method return false or error.
   */
  onDateChange?: (
    task: Task,
    children: Task[]
  ) => void | boolean | Promise<void> | Promise<boolean>
  /**
   * Invokes on progress change. Chart undoes operation if method return false or error.
   */
  onProgressChange?: (
    task: Task,
    children: Task[]
  ) => void | boolean | Promise<void> | Promise<boolean>
  /**
   * Invokes on delete selected task. Chart undoes operation if method return false or error.
   */
  onDelete?: (task: Task) => void | boolean | Promise<void> | Promise<boolean>
  /**
   * Invokes on expander on task list
   */
  onExpanderClick?: (task: Task) => void
}

export interface DisplayOption {
  viewMode?: ViewMode
  viewDate?: Date
  preStepsCount?: number
  /**
   * Specifies the month name language. Able formats: ISO 639-2, Java Locale
   */
  locale?: string
  rtl?: boolean
}

export interface StylingOption {
  headerHeight?: number
  columnWidth?: number
  listCellWidth?: string
  rowHeight?: number
  ganttHeight?: number
  barCornerRadius?: number
  handleWidth?: number
  fontFamily?: string
  fontSize?: string
  /**
   * How many of row width can be taken by task.
   * From 0 to 100
   */
  barFill?: number
  barProgressColor?: string
  barProgressSelectedColor?: string
  barBackgroundColor?: string
  barBackgroundSelectedColor?: string
  projectProgressColor?: string
  projectProgressSelectedColor?: string
  projectBackgroundColor?: string
  projectBackgroundSelectedColor?: string
  milestoneBackgroundColor?: string
  milestoneBackgroundSelectedColor?: string
  arrowColor?: string
  arrowIndent?: number
  todayColor?: string
  TooltipContent?: React.FC<{
    task: Task
    fontSize: string
    fontFamily: string
  }>
  TaskListHeader?: React.FC<{
    headerHeight: number
    rowWidth: string
    fontFamily: string
    fontSize: string
  }>
  TaskListTable?: React.FC<{
    rowHeight: number
    rowWidth: string
    fontFamily: string
    fontSize: string
    locale: string
    tasks: Task[]
    selectedTaskId: string
    /**
     * Sets selected task by id
     */
    setSelectedTask: (taskId: string) => void
    onExpanderClick: (task: Task) => void
  }>
}

export interface GanttProps extends EventOption, DisplayOption, StylingOption {
  tasks: Task[]
}

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

export enum IsFollow {
  FOLLOW = 1, // 关注
  UNFOLLOW = 2 // 未关注
}

export enum ScheduleShow {
  UN_SHOW = 1, // 不显示
  SHOW // 显示
}

export enum Conclusion {
  EXIST = 1, // 有总结
  NULL // 无总结
}

export enum FullShowMode {
  flat = 1,
  group
}

export enum FullGroupBy {
  time = 'time',
  group = 'group',
  project = 'project',
  default = 'default'
}

export enum GroupKey {
  MonthView = 'MonthView',
  ProjectDialog = 'ProjectDiscuss', // 项目讨论页
  TaskDialog = 'TaskDialog', // 事项讨论页
  FilePage = 'FilePage',
  ProjectList = 'ProjectList'
}

export interface FullViewParams {
  projectId?: string // 项目id
  query_type?: FullViewParamsQueryType // - 查询类型，1->未完成，2->已完成，3->我派发，4->我接受，5->协作事项，6->个人事项
  date_type?: 1 | 2 | '' // - 日期类型，1->今天之前，2->今天之后（包含今天）
  keywords?: string // 搜索关键字
  start_time?: number | '' // - 开始时间，时间戳
  end_time?: number | '' // - 截止时间，时间戳
  is_follow?: IsFollow | '' // - 是否关注 1->关注，2->未关注
  schedule_show?: ScheduleShow | '' //  - 日程显示 1->显示，2->不显示
  conclusion?: Conclusion //  总结，1->有总结，2->无总结
  tags_id?: string // - 标签id，多个用逗号隔开
  takers_id?: string // - 参与人id，多个用逗号隔开
  creators_id?: string //  - 创建人id，多个用逗号隔开
  administrators_id?: string // - 责任人id，多个用逗号隔开
  projects_id?: string // - 项目id，多个用逗号隔开
  not_projects_id?: string //  - 不包含项目id，多个用逗号隔开
  tasks_id?: string // - 事项id，多个用逗号隔开
  not_tasks_id?: string // - 不包含事项id，多个用逗号隔开
  sort?: 'asc' | 'desc' | '' // - 排序，asc->正序，desc->倒序， 默认正序
  parent_id?: string
  page_number: number // - 查询页数
  page_record?: number // 查询条数
  repeats_id?: string // 循环事项id
  group_by?: FullGroupBy
  show_mode?: FullShowMode // 1 平铺 2 收合
}

export enum Duration {
  EXIST = 1, // 有时间
  NULL // 无时间
}

export enum MATTER_TYPE {
  matter = 10701,
  meeting = 10702,
  timeCollect = 10703,
  notice = 10704,
  todo = 10705,
  //timeRemind = 10706,
  // calendar = 10707,
  target = 10001,
  project = 10708
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

export interface ITaker {
  dispatch_id: string
  ref_task_id?: string
  creator_id: string
  taker_id: string
  invite_id: string
  invite_name: string
  invite_type: 'flyele' | 'wechat' | 'manuallyJoin'
  identity: IDENTITY
  state:
    | MATTER_CREATOR_STATE
    | MEETING_CREATOR_STATE
    | MATTER_TAKER_STATE
    | MEETING_TAKER_STATE
  nick_name: string
  original_name: string
  avatar: string
  pinyin: string
  create_at: number
  personal_state:
    | MATTER_PERSONAL_STATE
    | MEETING_PERSONAL_STATE
    | NOTICE_PERSONAL_STATE
  operate_state: MATTER_OPERATE_STATE | MEETING_OPERATE_STATE
  remark?: string
  species: 1 | 2
  user_id?: string
  is_admin?: boolean // 是否责任人
  update_at?: number
  finish_time?: number
  is_workspace_extend_member?: boolean // 空间外部成员标识
  notice_id?: string // 审批人
  is_external_member?: boolean // 是否为外部成员
  is_view?: number // 是否第浏览过 0=>未进入 1=>已进入
  active_trigger?: number // 1 代表主动触发完成事项
  vip_type?: VipTypeEnum
  isVip?: boolean
  isTeamVip?: boolean
}

export interface FullViewTaker extends ITaker {
  accept_at?: number // 接受时间

  finish_time?: number // 完成时间

  is_admin?: boolean // 是否责任人
  set_admin_at?: number // 设为责任人的时间

  reason?: string // 备注，拒绝或者请假备注

  update_at?: number // 更新时间
  execute_at?: number // 启动时间
}
export enum TagWidgetColor {
  red = '#FFE7E3',
  orange = '#FFF2D1',
  green = '#E1F8F6',
  blue = '#E4ECFF',
  purple = '#F3ECFF'
}

export interface ITag extends TagModel {
  tag_id?: string
  extType?: string
}

interface IRepeatListItem {
  change?: boolean
  cycle: number
  repeat_finishes?: Array<{
    user_id: string
    finish_time: number
    active_trigger: 1
  }>
  repeat_id: string
  start_time?: number
  end_time?: number
  end_time_full_day?: 1 | 2
  start_time_full_day?: 1 | 2
  cycle_date: string

  // 为了方便额外存储
  task_id?: string

  overide?: boolean
  last_cycle?: number
}
export enum FileUploadStatus {
  wait,
  uploading,
  uploadSuccess,
  uploadFail
}

export type Files = {
  id: string
  name: string
  origin: string
  size: string
  uploadStatus?: FileUploadStatus
  default?: boolean
}

/**
 * 全量视图默认返回的事项 没有tag
 */
export type FullViewTask = {
  timestamp?: number
  // 统计已产生历史所有的循环次数总数量
  repeat_total?: number
  task_tree_total?: number
  task_tree_complete_total?: number
  uniqueKey?: string
  parentKey?: string
  date: string // 日期
  nick_name: string
  task_id: string
  dispatch_id: string
  title: string
  parent_id?: string
  has_child?: boolean // 是否有子事项

  isHide?: boolean

  finish_time?: number

  create_at: number // 创建时间
  update_at: number // 更新时间
  start_time?: number // 开始时间
  start_time_full_day?: 1 | 2
  end_time?: number // 结束时间
  end_time_full_day?: 1 | 2
  state: number

  matter_state: MatterState

  is_follow?: boolean // 是否关注
  matter_type: MATTER_TYPE.matter | MATTER_TYPE.meeting | MATTER_TYPE.todo // 事项类型 全量只支持 事项 | 会议| 待办
  parent_name?: string // 所属事项名称

  schedule_hide?: boolean // 日程是否隐藏
  takers: FullViewTaker[] // 协作人

  tags?: (ITag & { tag_id?: string })[]

  interact_process?: {
    child_total?: number // 子事项数量

    comment_total?: number // 评论数量

    file_total?: number // 文件数量

    gadget_meeting_total?: number // 会议数量

    gadget_todo_total?: number // 代办数量

    important_total?: number // 重点数量

    quote_total?: number // 引用数量
  }
  end_repeat_at?: number
  repeat_id?: string // 循环Id
  repeat_type?: LOOP_MATTER // 循环类型
  repeat_list?: IRepeatListItem[]
  complete_at?: number

  level?: number

  isOpen?: boolean

  childIdx?: number

  lineLevel?: number

  childLine?: boolean

  topParentLine?: boolean

  index?: number

  cycle?: number // 循环次数

  cycle_date?: string

  category?: number

  creator_id: string // 创建人id
  conclusion?: string // 总结
  identity?: IDENTITY // 身份
  group_id?: string // 分组Id
  group_name?: string // 分组名称
  duration?: Duration // 耗时
  last_active_at?: number //最后一次活跃时间
  personal_state?: number // 个人事项状态
  flow_step_id?: string
  flow_step_complete_at?: number // 所处步骤的完成时间
  flow_step_join?: boolean // 是否加入当前步骤
  remind_at?: any // ITask['remind_at'] 这里的类型对不上，和 app/hooks/useFollow.ts 的remind_at不统一
  detail?: string // 背景信息
  files?: Files[] // 背景信息文件

  priority_level?: QuadrantValue
} & Partial<IBaseProjectInfo> &
  Partial<IFullFlowStepList>
export interface IFullFlowStepList {
  application_id: string // 应用id
  application_name: string // 应用名称
  flow_step_id: string // 步骤id
  flow_step_name: string // 步骤名称
}

export type BarMoveAction = 'progress' | 'end' | 'start' | 'move'
export type GanttContentMoveAction =
  | 'mouseenter'
  | 'mouseleave'
  | 'delete'
  | 'dblclick'
  | 'click'
  | 'select'
  | ''
  | BarMoveAction

export type GanttEvent = {
  changedTask?: BarTask
  originalSelectedTask?: BarTask
  action: GanttContentMoveAction
}

export interface BarTask extends Task {
  index: number
  typeInternal: TaskTypeInternal
  x1: number
  x2: number
  y: number
  height: number
  progressX: number
  progressWidth: number
  barCornerRadius: number
  handleWidth: number
  barChildren: BarTask[]
  styles: {
    backgroundColor: string
    backgroundSelectedColor: string
    progressColor: string
    progressSelectedColor: string
  }
}

export type TaskTypeInternal = TaskType | 'smalltask'

export interface DateSetup {
  dates: Date[]
  viewMode: ViewMode
}
