import { I18N } from '@flyele-nx/i18n'
import React, { FC, useState, useEffect, useMemo } from 'react'
import { FlyTooltip, useMemoizedFn } from '@flyele/flyele-components'
import cs from 'classnames'
import style from './index.module.scss'
import NoDataText from '../../components/NoDataText'
import { IFullViewCellProps, IScheduleTask } from '@flyele-nx/types'
import { MatterType } from '@flyele-nx/constant'
import {
  globalNxController,
  useUserInfoStore
} from '@flyele-nx/global-processor'
import { getTimeTxt } from '../../utils'

const Time: FC<React.PropsWithChildren<IFullViewCellProps>> = ({
  data,
  isStart
}) => {
  const [showText, setShowText] = useState<string>('')
  const userId = useUserInfoStore((state) => state.userInfo.user_id)
  const isCreator = useMemo(() => {
    return data.creator_id === userId
  }, [data.creator_id, userId])
  useEffect(() => {
    setShowText(getTimeTxt(data, isStart || false))
  }, [data, isStart])

  const editTime = useMemoizedFn((e) => {
    e.stopPropagation()

    /**
     * 如果存在右键菜单，先把菜单关闭了，因为上面阻止冒泡了，所以触发不了关闭右键菜单
     */
    // const contextMenuVisible = contextMenuTool.getVisible()
    // if (contextMenuVisible) {
    //   contextMenuTool.close()
    //   return
    // }

    // 已完成不可设置时间
    if (data.finish_time) {
      return
    }

    // 无需处理的事项判断自己是否未协作人
    if (
      // 作为创建人可以修改时间
      !isCreator &&
      // ((groupIdCtx && !task.dispatch_id) || memberIdCtx !== userId) &&
      data.matter_type === MatterType.matter &&
      !data.takers?.find((taker) => taker.taker_id === userId)
    ) {
      globalNxController.showMsg({
        msgType: '错误',
        content: I18N.common.nonCollaboratorNone
      })
      return
    }

    let remindAt = {}

    // 项目事项分组里的task没有remind_at
    if (data.remind_at) {
      remindAt = {
        ...data.remind_at,
        start_remind: data.remind_at.start_remind
      }
    }

    globalNxController.openEditTaskTime({
      taskId: data.task_id,
      task: { ...data, ref_task_id: data.task_id } as IScheduleTask,
      isCreator,
      repeatType: data.repeat_type || 0,
      matterType: data.matter_type,
      remindAt
    })
  })

  return (
    <>
      {showText ? (
        <FlyTooltip strategy="fixed" text={showText} needInheritSize={false}>
          <div
            className={cs(style.time, {
              [style.hiddenText]: showText === ''
            })}
            onClick={editTime}
          >
            {showText}
          </div>
        </FlyTooltip>
      ) : (
        <div onClick={editTime}>
          <NoDataText
            text={I18N.common.addTime}
            warpClass={cs(style.textBox)}
          />
        </div>
      )}
      <div></div>
    </>
  )
}

export { Time }
