// 工作流创建入参
import { FlowOperateType, FlowRangeType } from './const'

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
