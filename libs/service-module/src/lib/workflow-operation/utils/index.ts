import { IStepItem, OperateStep } from '../WorkFlowStep'
import { IOperation } from '../types'
import { IScheduleTask, IWorkflowStep } from '@flyele-nx/service'

export function curStepInfo(flowSteps: IWorkflowStep[], curStepId: string) {
  const targetIdx = flowSteps.findIndex((i) => i.id === curStepId)

  if (targetIdx < 0) {
    // console.info('工作流无此步骤')
    return null
  }

  return {
    ...flowSteps[targetIdx],
    targetIdx,
    isFirstStep: targetIdx === 0,
    isLastStep: targetIdx === flowSteps.length - 1
  }
}

export function stepsFormatter(
  flowSteps: IWorkflowStep[],
  curStepId: string,
  hasAddUser: boolean
) {
  const targetIdx = flowSteps.findIndex((i) => i.id === curStepId)

  if (targetIdx < 0) {
    //  console.info('工作流无此步骤')
    return []
  }
  const steps: IStepItem[] = flowSteps.map((item, index) => ({
    idx: index + 1,
    title: item.name,
    members: item.user_ids,
    operateType: item.operate_type,
    step:
      index < targetIdx
        ? OperateStep.PRE
        : index > targetIdx
        ? OperateStep.NEXT
        : OperateStep.CUR
  }))

  if (hasAddUser) {
    steps.unshift({
      idx: -1,
      title: '',
      step: OperateStep.START
    })
    steps.push({
      idx: flowSteps.length + 2,
      title: '',
      step: OperateStep.DONE
    })
    // 因为前后各插入了一个，所以此时数组最少有三个元素
    return steps.slice(targetIdx, targetIdx + 3)
  }

  const begin = targetIdx === 0 ? 0 : targetIdx - 1
  const end = targetIdx + 2

  return steps.slice(begin, end)
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
  }
): IOperation {
  if (!info.dispatch_id) return 'pass'

  const complete_at =
    info.flow_step_complete_at ||
    info.complete_at ||
    info.flow_step_user_complete

  // 如果当前步骤没有人的话
  if (!info.flow_step_user_count) {
    // 当创建人是当前用户的话
    // if (info.creator_id === store.getState().user.userInfo.user_id) {
    //   // 如果已完成的话
    //   if (complete_at) {
    //     return 'complete'
    //   }
    //   return 'handle'
    // }

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
