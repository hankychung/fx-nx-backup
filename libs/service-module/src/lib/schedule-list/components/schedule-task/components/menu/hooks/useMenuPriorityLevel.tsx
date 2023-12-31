import React from 'react'
import { useMemoizedFn } from 'ahooks'
import { PriorityLevelPopper } from '../../../../../../priority-level-popper'
import { IScheduleTask } from '@flyele-nx/types'
import { IAction } from '../../../../../../context-menu/types'
import { TaskHandler } from '../../../../../utils/taskHandler'
import { getDiffKeys } from '../../../../../utils'
import { QuadrantValue } from '@flyele-nx/constant'

export const useMenuPriorityLevel = ({
  data
}: {
  data: IScheduleTask
}): IAction => {
  const reRender = useMemoizedFn((close: () => void) => {
    const id = data.ref_task_id
    const matter_type = data.matter_type
    const priority_level = data.priority_level as QuadrantValue

    if (!id || !matter_type) return <div />

    return (
      <PriorityLevelPopper
        onChange={(level) => {
          TaskHandler.batchModify({
            ...getDiffKeys([data]),
            diff: {
              priority_level: level
            }
          })
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
