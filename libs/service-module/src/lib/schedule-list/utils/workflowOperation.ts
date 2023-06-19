import { IScheduleTask } from '@flyele-nx/service'

export type IOperation = 'pass' | 'complete' | 'handle'

export interface IOperationProps {
  taskId: string
  creator_id: string
  complete_at?: number
  curStepId: string
  handleHover?: (isHover: boolean) => void
  size?: number
  popoverPos?: 'fixed' | 'absolute'
  addClickAlwaysHide?: boolean // 控制器点show的时候是否需要加上 addClickAlwaysHide
  status: IOperation
}

export function getOperationStatus(
  info: Pick<
    IScheduleTask,
    | 'flow_step_complete_at'
    | 'flow_step_user_count'
    | 'flow_step_join'
    | 'flow_step_user_complete'
  > & {
    complete_at?: number
    dispatch_id?: string
    creator_id: string
  },
  user_id: string
): IOperation {
  if (!info.dispatch_id) return 'pass'

  const complete_at =
    info.flow_step_complete_at ||
    info.complete_at ||
    info.flow_step_user_complete

  // 如果当前步骤没有人的话
  if (!info.flow_step_user_count) {
    // 当创建人是当前用户的话
    if (info.creator_id === user_id) {
      // 如果已完成的话
      if (complete_at) {
        return 'complete'
      }
      return 'handle'
    }

    // 如果已完成的话
    if (complete_at) {
      return 'complete'
    }
    return 'pass'
  }

  if (!info.flow_step_join && !complete_at) {
    return 'pass'
  }

  if (complete_at) {
    return 'complete'
  }

  return 'handle'
}
