import {
  ApplicationState,
  ApplicationType,
  FlowOperateType,
  FlowRangeType,
  LOOP_MATTER,
  LocationType,
  MatterType,
  ProjectJoin,
  SortOperateType
} from '@flyele-nx/constant'

export interface IFlowStepCreate {
  name: string // 步骤名称
  sort: number // 排序
  operate_type: FlowOperateType // 协作人操作方式 - 每个步骤的协作人选择方式
  range_type: FlowRangeType // 协作人范围类型
  id?: string // id
  user_ids?: string[] // 协助人ids 根据范围类型来决定是否传
  range_user_ids?: string[] // 范围协作人ids 根据范围类型来决定是否传 - 范围协作人, 每个步骤可选的协作人
  specify_user_ids?: string[] // 指定协作人ids 根据范围类型来决定是否传 - 固定协作人
  isApplyAll?: boolean // 是否应用当前工作流所有协作人
  origin_specify_user_ids?: string[] //创建工作流应用回显应用调用人
  origin_user_ids?: string[] //创建工作流应用回显应用调用人
}

export interface IFlowStepData extends IFlowStepCreate {
  application_id: string // 应用id
  id: string
}

export interface ICreateApplicationParams {
  name: string // 应用名称
  cover?: string // 背景封面
  cover_size?: string // 背景封面缩放 100% ～ 200%
  cover_position?: string // 背景封面坐标 0% 0% ～ 100% 100%
  flow_step_data?: IFlowStepCreate[]
  detail?: string // 应用说明
  number?: number // 序号
  project_ids?: string[] // 项目ids
  state?: ApplicationState // 应用状态
  task_data: any
  type: ApplicationType // 应用类型
  use_count?: number // 使用次数
  workspace_id?: string // 空间id
  delete_flow_step_id?: string[]
}

export interface IApplicationList extends ICreateApplicationParams {
  id: string
  sort: number // 排序
  create_at: number // 创建时间
  update_at: number // 修改时间
  creator_id: string // 创建人
  flow_step_data?: IFlowStepData[]
  add_user_id?: string // 添加到项目内的添加人
  add_at?: number // 添加到项目内的添加时间
  projects?: Array<{ project_id: string; project_name: string }>
  version?: number
}

export interface IApplicationListParams {
  location_type: LocationType // 列表所在页面类型
  workspace_id?: string // 空间id
  project_id?: string // 项目id
  page_number?: number // 页数 默认 1
  page_record?: number // 页量 默认 20
}

export interface IBatchApplicationParams {
  application_ids: string
}

export interface IApplicationCoverParams {
  cover?: File // 文件
  cover_size?: string // 封面大小
  cover_position?: string // 封面坐标点
}

export interface IDeleteApplicationParams {
  application_id: string // 应用ID
  workspace_id?: string // 空间id
  project_ids?: string[] // 项目ids 项目内再传入
}

// 应用详情
export interface IApplicationTaskData {
  title: string
  category?: number
  children?: IApplicationTaskData[]
  detail?: string
  dispatch_state?: number
  end_collect?: number
  end_repeat_at?: number
  end_time?: number
  end_time_full_day?: 1 | 2
  execute_addr?: string
  files?: any[]
  is_checkbox?: number
  is_dispatch?: number
  matter_type: MatterType
  max_taker_total?: number
  parent_id?: string
  project_id?: string
  remind_at?: {
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
  repeat_type?: LOOP_MATTER
  sort?: null
  start_time?: number
  start_time_full_day?: 1 | 2
  task_id?: string
  temp_id?: string
  time_collects?: null
  is_exist_empty?: boolean // 结构性错误判断
  takers?: string[] // 协作人
}

export interface IApplicationDetail extends IApplicationList {
  task_data: IApplicationTaskData
  is_exist_empty?: boolean // 结构性错误判断
}

export interface ISortApplicationListParams {
  location_type: LocationType // 列表所在页面类型
  max_index: number // 最大序号
  min_index: number // 最小序号
  operate_type: SortOperateType // 操作类型 "down" 向后拖动 "up" 向前拖动
  workspace_id?: string // 空间id
  project_id?: string // 项目id
}

export interface IProjectAddAppParams {
  application_ids: string[]
  project_id: string
}

export interface ICopyApplicationParams {
  copy_application_id: string
  project_ids?: string[]
  workspace_id?: string
}

export interface ISpaceAppListParams
  extends Omit<IApplicationListParams, 'location_type'> {
  workspace_id: string // 空间id
}

export interface ISpaceApplicationList {
  create_at: number // 创建时间
  creator_id: string // 创建人
  id: string
  is_exist: boolean // 是否已经存在
  name: string // 应用名称
  number: number // 序号
  workspace_id: string // 空间id
}

export interface IProjectsJoinAppParams {
  application_id?: string // 应用id
  query_type?: ProjectJoin // 筛选项目
}

export interface IProjectsJoinApp {
  create_at: number // 创建时间
  creator_id: string // 创建人
  id: string // 项目id
  name: string // 项目名称
  is_exist: false // 应用是否存在与这个项目
  workspace_id: string // 空间id
}
