import { useMemo } from 'react'
import { IScheduleTask } from '@flyele-nx/service'
import { useMenuPin } from './useMenuPin'
import { useMenuFollow } from './useMenuFollow'
import { useMenuHide } from './useMenuHide'
import { useMenuQuit } from './useMenuQuit'
import { useMenuPriorityLevel } from './useMenuPriorityLevel'
import { useMenuSelectTime } from './useMenuSelectTime'
import { useMenuSummary } from './useMenuSummary'

interface IMenuActions {
  data: IScheduleTask
}

export const useMenuActions = (props: IMenuActions) => {
  const { data } = props

  /**
   * 菜单功能—置顶
   */
  const pin = useMenuPin({ data })

  /**
   * 菜单功能—优先级
   */
  const priorityLevel = useMenuPriorityLevel({ data })

  /**
   * 菜单功能—关注
   */
  const follow = useMenuFollow({ data })

  /**
   * 菜单功能—调整时间
   */
  const selectTime = useMenuSelectTime({ data })

  /**
   * 菜单功能—总结
   */
  const summary = useMenuSummary({ data })

  /**
   * 菜单功能—隐藏
   */
  const hide = useMenuHide({ data })

  /**
   * 菜单功能—退出/取消
   */
  const quit = useMenuQuit({ data })

  /**
   * 右键菜单
   */
  const menuActions = useMemo(() => {
    return [pin, priorityLevel, follow, selectTime, summary, hide, quit]
  }, [pin, priorityLevel, follow, selectTime, summary, hide, quit])

  return {
    menuActions
  }
}
