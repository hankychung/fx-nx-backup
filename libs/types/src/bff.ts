/**
 * proto.task_detail.GetTaskReply_TaskDetail
 */
interface IBffTaskDetail {
  /**
   * 任务循环列表
   */
  repeat_list?: IRepeatList[]
  /**
   * 标签
   */
  tags?: ITag[]
  /**
   * 协作人列表
   */
  takers?: ITakers[]
  task: ITask
  task_conclusion: ITaskConclusion
  task_dispatch?: ITaskDispatch
  /**
   * 事项工作流
   */
  task_flow_steps?: ITaskFlowSteps[]
  task_relation?: ITaskRelation
}

/**
 * proto.task_detail.GetTaskReply_RepeatList，查询任务重复列表
 */
interface IRepeatList {
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
  repeat_change?: IRepeatListRepeatChange
  /**
   * 完成循环用户
   */
  repeat_finishes?: IRepeatListRepeatFinishes[]
  /**
   * 循环id
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
 * proto.task_detail.RepeatList_Repeat_change
 */
interface IRepeatListRepeatChange {
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
 * proto.task_detail.RepeatList_Repeat_finishes
 */
interface IRepeatListRepeatFinishes {
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
 * proto.task_detail.GetTaskReply_TagBinds，绑定标签
 */
interface ITag {
  color?: string
  id?: string
  name?: string
}

/**
 * proto.task_detail.GetTaskReply_Takers
 */
interface ITakers {
  /**
   * 接受时间
   */
  accept_at?: number
  /**
   * 头像
   */
  avatar?: string
  biz?: ITakersTakerBiz
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
   * 是否浏览,1->是
   */
  is_view?: number
  /**
   * 空间外部成员表示
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
   * 事项参与人操作状态
   */
  personal_state?: number
  /**
   * 拼音
   */
  pinyin?: string
  /**
   * 备注,拒绝或者请假备注
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
 * proto.task_detail.Takers_TakerBiz
 */
interface ITakersTakerBiz {
  is_project_extend_member?: boolean
  matter_state?: IMatterState
}

/**
 * proto.task_detail.GetTaskReply_MatterState
 */
interface IMatterState {
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
 * proto.task_detail.GetTaskReply_Task
 */
interface ITask {
  application_data?: IApplicationData
  /**
   * v2.1 事项工作流
   */
  application_id?: string
  /**
   * 头像
   */
  avatar?: string
  /**
   * 1 代表来自上层取消
   */
  cancel_from?: number
  /**
   * 是否是小工具
   */
  category?: number
  /**
   * 事项完成时间
   */
  complete_at?: number
  /**
   * 创建时间
   */
  create_at?: number
  /**
   * 创建人
   */
  creator_id?: string
  /**
   * 任务描述
   */
  detail?: string
  /**
   * 重复结束时间戳,当天崚嶒时间
   */
  end_repeat_at?: number
  /**
   * 结束时间
   */
  end_time?: number
  /**
   * 截止时间全天事项
   */
  end_time_full_day?: number
  /**
   * 执行地点
   */
  execute_addr?: string
  /**
   * 文件信息
   */
  files?: IFiles[]
  /**
   * 工作流步骤ID
   */
  flow_step_id?: string
  /**
   * 用户是否参与当前工作流
   */
  flow_step_join?: boolean
  /**
   * 用户步骤是否已完成
   */
  flow_step_user_complete?: boolean
  /**
   * 流程步骤用户计数
   */
  flow_step_user_count?: number
  /**
   * 事项是否取消
   */
  is_cancel?: boolean
  /**
   * 是否多选
   */
  is_checkbox?: number
  /**
   * 任务类型: 10701->任务, 10702->会议
   */
  matter_type?: number
  /**
   * 最大参与人总数
   */
  max_taker_total?: number
  /**
   * 名称
   */
  nick_name?: string
  /**
   * v2.1-p2 事项完成操作类型
   */
  operate_type?: number
  /**
   * 原始名称
   */
  original_name?: string
  /**
   * 父事项ID
   */
  parent_id?: string
  /**
   * 拼音
   */
  pinyin?: string
  /**
   * 项目id
   */
  project_id?: string
  /**
   * 项目名称
   */
  project_name?: string
  /**
   * 关联会议id
   */
  ref_meeting_id?: string
  /**
   * 关联会议名称
   */
  ref_meeting_name?: string
  remind_at?: IRemindAt
  /**
   * 重复周期
   */
  repeat_type?: number
  /**
   * 开始时间
   */
  start_time?: number
  /**
   * 开始时间全天事项
   */
  start_time_full_day?: number
  /**
   * 项目事项分组ID
   */
  task_group_id?: string
  /**
   * 项目事项分组名称
   */
  task_group_name?: string
  /**
   * 事项id
   */
  task_id: string
  /**
   * 任务标题
   */
  title: string
  /**
   * 顶级事项创建人
   */
  top_creator_id?: string
  /**
   * 更新时间
   */
  update_at?: number
  widget?: IWidget
  /**
   * 空间iD
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
 * proto.task_detail.GetTaskReply_ApplicationData
 */
interface IApplicationData {
  /**
   * 背景封面
   */
  cover?: string
  /**
   * 创建时间
   */
  create_at?: number
  /**
   * 创建人
   */
  creator_id?: string
  /**
   * 应用说明
   */
  detail?: string
  /**
   * 应用名称
   */
  name?: string
  /**
   * 序号
   */
  number?: number
  /**
   * 应用状态:1.正常,2.取消
   */
  state?: number
  /**
   * 应用类型：1.普通应用；2.工作流应用
   */
  type?: number
  /**
   * 修改时间
   */
  update_at?: number
  /**
   * 空间ID
   */
  workspace_id?: string
}

/**
 * proto.task_detail.GetTaskReply_Files
 */
interface IFiles {
  /**
   * 文件ID
   */
  id?: string
  /**
   * 文件名称
   */
  name?: string
  /**
   * 文件来源
   */
  origin?: string
  /**
   * 文件大小
   */
  size?: string
}

/**
 * proto.task_detail.GetTaskReply_RemindAt
 */
interface IRemindAt {
  /**
   * 自定义提醒
   */
  alone_remind?: number[]
  /**
   * 结束时间提醒
   */
  end_remind?: number[]
  /**
   * 最大自定义提醒数量,最大 5
   */
  max_alone_total?: number
  /**
   * 开始时间提醒
   */
  start_remind?: number[]
}

/**
 * proto.task_detail.GetTaskReply_Widget
 */
interface IWidget {
  /**
   * 地点
   */
  execute_addr?: boolean
  /**
   * 提醒时间控件
   */
  remind?: boolean
  /**
   * 重复
   */
  repeat?: boolean
  /**
   * 时间控件
   */
  time?: boolean
}

/**
 * proto.task_detail.GetTaskReply_TaskConclusion，事项总结
 */
interface ITaskConclusion {
  /**
   * 总结内容
   */
  content?: string
  /**
   * 创建时间
   */
  create_at?: number
  /**
   * 创建者
   */
  creator_id?: string
  /**
   * 删除时间
   */
  delete_at?: number
  /**
   * 文件信息
   */
  files?: ITaskConclusionFile[]
  /**
   * 关联的事项ID
   */
  task_id?: string
  /**
   * 更新时间
   */
  update_at?: number
  /**
   * 更新者
   */
  updater_id?: string
  /**
   * 更新者昵称
   */
  updater_name?: string
}

/**
 * proto.task_detail.TaskConclusion_File
 */
interface ITaskConclusionFile {
  /**
   * id
   */
  id?: string
  /**
   * 名称
   */
  name?: string
  /**
   * 来源
   */
  origin?: string
  /**
   * 大小
   */
  size?: string
}

/**
 * proto.task_detail.GetTaskReply_TaskDispatch
 */
interface ITaskDispatch {
  /**
   * 是否主动触发
   */
  active_trigger?: number
  /**
   * 头像
   */
  avatar?: string
  biz?: ITaskDispatchTakerBiz
  /**
   * 创建时间
   */
  create_at?: number
  /**
   * 删除时间,大于0等于隐藏
   */
  delete_at?: number
  /**
   * 派发id
   */
  dispatch_id?: string
  /**
   * 启动时间
   */
  execute_at?: number
  /**
   * 退出时间
   */
  exit_at?: number
  /**
   * 完成时间
   */
  finish_time?: number
  /**
   * 有子事项，未接受则有未接受子事项，未完成则有未完成子事项
   */
  has_child?: boolean
  /**
   * 事项身份
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
   * 邀请类型
   */
  invite_type?: string
  /**
   * 是否责任人
   */
  is_admin?: boolean
  /**
   * 是否是我派发
   */
  is_dispatch?: boolean
  /**
   * 是否浏览 1->是
   */
  is_view?: number
  /**
   * 名称
   */
  nick_name?: string
  /**
   * 操作状态
   */
  operate_state?: number
  /**
   * 原始名称
   */
  original_name?: string
  personal_remind_at?: IPersonalRemindAt
  /**
   * 个人状态
   */
  personal_state?: number
  /**
   * 拼音
   */
  pinyin?: string
  /**
   * / 原因
   */
  reason?: string
  /**
   * 撤回时间
   */
  revoke_at?: number
  /**
   * 事项状态
   */
  state?: number
  /**
   * 承接人ID
   */
  taker_id?: string
}

/**
 * proto.task_detail.TaskDispatch_TakerBiz
 */
interface ITaskDispatchTakerBiz {
  matter_state?: IMatterState
}

/**
 * proto.task_detail.GetTaskReply_PersonalRemindAt
 */
interface IPersonalRemindAt {
  /**
   * 结束时间延长提醒
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
 * proto.task_detail.GetTaskReply_TaskFlowSteps
 */
interface ITaskFlowSteps {
  /**
   * 退回详情
   */
  back_detail?: string
  /**
   * 完成时间
   */
  complete_at?: number
  /**
   * 主键id
   */
  id?: string
  /**
   * 步骤名称
   */
  name?: string
  /**
   * 协作人操作方式:1.或; 2.且
   */
  operate_type?: number
  /**
   * 协作人范围类型：1.不可自选；2.指定范围；3.不指定范围
   */
  range_type?: number
  /**
   * 范围协作人ids
   */
  range_user_ids?: string[]
  /**
   * 排序
   */
  sort?: number
  /**
   * 指定协作人ids
   */
  specify_user_ids?: string[]
  /**
   * 步骤状态： 0.未开始 ；1. 进行中；2.已完成；3.等待再次梳理 ；4.已退回 @inject_tag: json:"state"
   */
  state?: number
  /**
   * 事项ID
   */
  task_id?: string
  user_ids?: IUserIds[]
}

/**
 * proto.task_detail.GetTaskReply_UserIds
 */
interface IUserIds {
  /**
   * 退回时间
   */
  back_at?: number
  /**
   * 完成时间
   */
  complete_at?: number
  /**
   * 是否退回
   */
  is_back?: boolean
  /**
   * 是否固定成员
   */
  is_lock?: boolean
  /**
   * 移除时间
   */
  removed_at?: number
  /**
   * 步骤id
   */
  step_id?: string
  /**
   * 事项id
   */
  task_id?: string
  /**
   * 用户头像
   */
  user_avatar?: string
  /**
   * 用户id
   */
  user_id?: string
  /**
   * 用户名称
   */
  user_name?: string
}

/**
 * proto.task_detail.GetTaskReply_TaskRelation，查询任务关联数据
 */
interface ITaskRelation {
  /**
   * 子事项数量
   */
  child_total?: number
  /**
   * 子事项
   */
  children?: ITaskRelationChildren[]
  /**
   * 回复总数
   */
  comment_total?: number
  /**
   * 事项创建时间
   */
  create_at?: number
  /**
   * 文件总数
   */
  file_total?: number
  /**
   * 小工具会议综述
   */
  gadget_meeting_total?: number
  /**
   * 小工具公告总数
   */
  gadget_notice_total?: number
  /**
   * 小工具时间征集总数
   */
  gadget_time_collect_total?: number
  /**
   * 小工具待办总数
   */
  gadget_todo_total?: number
  /**
   * 重点条数
   */
  important_total?: number
  /**
   * 是否关注
   */
  is_follow?: boolean
  /**
   * 是否有红点
   */
  is_red_dot?: boolean
  /**
   * 笔记总数
   */
  note_total?: number
  /**
   * 公告悬浮
   */
  notice_float?: ITaskRelationNoticeFloat[]
  /**
   * 父事项
   */
  parents?: ITaskRelationParents[]
  project?: ITaskRelationProject
  /**
   * 引用数量
   */
  quote_total?: number
  /**
   * 记录总数
   */
  record_total?: number
  /**
   * 承接人总数
   */
  taker_total?: number
  /**
   * 记录总数
   */
  unread_total?: number
  workspace?: ITaskRelationWorkspace
}

/**
 * proto.task_detail.TaskRelation_Children
 */
interface ITaskRelationChildren {
  /**
   * 子事项数量
   */
  child_total?: number
  /**
   * 事项创建时间
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
   * 循环截止时间
   */
  end_repeat_at?: number
  /**
   * 结束时间
   */
  end_time?: number
  /**
   * 截止时间全天事项
   */
  end_time_full_day?: number
  /**
   * 完成时间
   */
  finish_time?: number
  /**
   * 参与人身份
   */
  identity?: number
  /**
   * 子事项是否有子事项
   */
  is_child?: boolean
  /**
   * 事项类型
   */
  matter_type?: number
  /**
   * 操作状态
   */
  operate_state?: number
  /**
   * 个人状态
   */
  personal_state?: number
  remind_at?: CommonRemindAt
  /**
   * 循环id
   */
  repeat_id?: string
  /**
   * 循环类型
   */
  repeat_type?: number
  /**
   * 开始时间
   */
  start_time?: number
  /**
   * 开始时间全天事项
   */
  start_time_full_day?: number
  /**
   * 任务状态
   */
  state?: number
  /**
   * 承接人id
   */
  taker_id?: string
  /**
   * 参与人数量
   */
  taker_total?: number
  /**
   * 事项id
   */
  task_id?: string
  /**
   * 事项标题
   */
  title?: string
}

/**
 * common.RemindAt，事项的时间提醒
 */
interface CommonRemindAt {
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
 * proto.task_detail.TaskRelation_Notice_float
 */
interface ITaskRelationNoticeFloat {
  /**
   * 公告详情
   */
  detail?: string
  /**
   * 公告id
   */
  task_id?: string
  /**
   * 公告标题
   */
  title?: string
}

/**
 * proto.task_detail.TaskRelation_Parents
 */
interface ITaskRelationParents {
  /**
   * 父事项应用id
   */
  application_id?: string
  /**
   * 父事项创建人
   */
  creator_id?: string
  /**
   * 父事项id
   */
  task_id?: string
  /**
   * 父事项名称
   */
  title?: string
}

/**
 * proto.task_detail.TaskRelation_Project
 */
interface ITaskRelationProject {
  /**
   * 项目创建者
   */
  creator_id?: string
  /**
   * 项目id
   */
  project_id?: string
  /**
   * 项目成员
   */
  project_name?: string
  /**
   * 项目状态
   */
  project_state?: number
  /**
   * 项目所属空间id
   */
  workspace_id?: string
  /**
   * 项目所属空间名称
   */
  workspace_name?: string
  /**
   * 空间状态
   */
  workspace_state?: number
  /**
   * 空间类型
   */
  ws_type?: number
}

/**
 * proto.task_detail.TaskRelation_Workspace
 */
interface ITaskRelationWorkspace {
  /**
   * 空间id
   */
  workspace_id?: string
  /**
   * 空间名称
   */
  workspace_name?: string
}

/**
 * common.ApiError，接口请求错误时的错误信息
 */
interface CommonApiError {
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

export { IBffTaskDetail }
