import { useMemo } from 'react'
import { useMemoizedFn } from 'ahooks'
import { IScheduleTask, ScheduleTaskConst } from '@flyele-nx/service'
import { IAction } from '../../../../../../context-menu/types'
import { globalNxController } from '../../../../../../global/nxController'

export const useMenuSummary = ({ data }: { data: IScheduleTask }): IAction => {
  const action = useMemoizedFn(async () => {
    globalNxController.openEditTaskSummary({ task: data })
  })

  const check = useMemo(() => {
    return data.matter_type === ScheduleTaskConst.MatterType.matter
  }, [data.matter_type])

  return {
    txt: '总结',
    callback: action,
    checkAction: check
  }
}
