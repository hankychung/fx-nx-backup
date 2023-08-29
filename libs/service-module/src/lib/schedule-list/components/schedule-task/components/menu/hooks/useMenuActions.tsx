import { useMemo } from 'react'
import { IScheduleTask } from '@flyele-nx/types'
import { useMenuPin } from './useMenuPin'
import { useMenuFollow } from './useMenuFollow'
import { useMenuHide } from './useMenuHide'
import { useMenuQuit } from './useMenuQuit'
import { useMenuPriorityLevel } from './useMenuPriorityLevel'
import { useMenuSelectTime } from './useMenuSelectTime'
import { useMenuSummary } from './useMenuSummary'

interface IMenuActions {
  data: IScheduleTask
  isVipWin?: boolean
  isTopTask?: boolean
}

export const useMenuActions = (props: IMenuActions) => {
  const { data, isVipWin = false, isTopTask } = props

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
  const quit = useMenuQuit({ data, isVipWin })

  /**
   * 右键菜单
   */
  const menuActions = useMemo(() => {
    const action = [priorityLevel, follow, selectTime, summary, hide, quit]
    if (isTopTask) {
      action.unshift(pin)
    }
    return action
  }, [priorityLevel, follow, selectTime, summary, hide, quit, isTopTask, pin])

  return {
    menuActions
  }
}
