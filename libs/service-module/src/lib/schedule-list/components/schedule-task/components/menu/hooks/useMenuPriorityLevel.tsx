import React from 'react'
import { useMemoizedFn } from 'ahooks'
import { PriorityLevelPopper } from '../../../../../../priority-level-popper'
import { IScheduleTask, ScheduleTaskConst } from '@flyele-nx/service'
import { IAction } from '../../../../../../context-menu'

export const useMenuPriorityLevel = ({
  data
}: {
  data: IScheduleTask
}): IAction => {
  const reRender = useMemoizedFn((close: () => void) => {
    const id = data.ref_task_id
    const matter_type = data.matter_type
    const priority_level =
      data.priority_level as ScheduleTaskConst.QuadrantValue

    if (!id || !matter_type) return <div />

    return (
      <PriorityLevelPopper
        onChange={(level) => {
          // setPriorityLevel(id, level)
        }}
        close={close}
        task_id={id}
        matter_type={matter_type}
        priority_level={priority_level}
      />
    )
  })

  return {
    txt: '',
    callback: () => null,
    checkAction: true,
    reRender
  }
}
