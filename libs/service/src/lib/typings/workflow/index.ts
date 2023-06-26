// 工作流创建入参
import { FlowOperateType, FlowRangeType, FlowState } from './const'

export interface ITaskFlowStepData {
  application_flow_step_id: string
  name: string
  operate_type: FlowOperateType
  range_type: FlowRangeType
  range_user_ids?: string[]
  sort: number
  specify_user_ids?: string[]
  user_ids?: { id: string; is_lock: boolean }[]
}

export interface IWorkflowStep {
  // 0.未开始 ；1. 进行中；2.已完成；3.等待再次梳理 ；4.已退回
  state?: FlowState
  back_detail?: string
  complete_at?: number
  removed_at?: number
  id: string
  name: string
  //协作人操作方式：1.或；2.且
  operate_type: FlowOperateType
  // 协作人范围类型：1.不可自选；2.指定范围；3.不指定范围
  range_type: FlowRangeType
  // 排序
  sort: number
  task_id: string
  // 范围协作人ids
  range_user_ids?: string[]
  // 指定协作人ids
  specify_user_ids?: string[]
  // 步骤协作人ids
  user_ids?: IUserStepInfo[]
  // 创建人id
  creator_id?: string
}

export interface IUserStepInfo {
  // 移出时间
  removed_at?: number
  // 退回时间
  back_at?: number
  // 完成时间
  complete_at?: number
  // 是否退回
  is_back?: boolean
  // 是否固定成员
  is_lock?: boolean
  // 步骤id
  step_id: string
  // 事项id
  task_id: string
  // 用户头像
  user_avatar?: string
  // 用户id
  user_id: string
  // 用户名称
  user_name: string
}
