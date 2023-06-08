import { FC, memo, useMemo, useState } from 'react'
import {
  IScheduleTask,
  ScheduleTaskConst,
  TaskDispatchApi
} from '@flyele-nx/service'
import styles from './index.module.scss'
import {
  CheckIcon,
  UncheckIcon,
  DisabledIcon,
  TimeCollectFinishIcon,
  TimeCollectIcon,
  CalendarIcon,
  CalendarFinish,
  MeetingIcon,
  MeetingFinishedIcon
} from '@flyele-nx/icon'
import checkingIcon from '../../assets/schedule/checking.gif'
import { setTimeoutForIdleCallback } from '@flyele-nx/utils'
import { useMemoizedFn } from 'ahooks'
import { changeCompleteState } from './utils'
import AcceptOnceMany from '../accept-once-many'
import { useScheduleStore } from '../schedule-list/utils/useScheduleStore'

interface IProps {
  task: IScheduleTask
  changeStatus?: () => void
  resetStatus?: () => void
}

const ANIMATION_DURATION = 900

const _StatusBox: FC<IProps> = (props) => {
  const { task, changeStatus, resetStatus } = props
  const [updating, setUpdating] = useState(false)
  const children = useScheduleStore(
    (state) => state.childrenDict[task.ref_task_id]
  )

  console.log('children', children)

  const [visible, setVisible] = useState(false)

  // 非我执行
  const nonSelfExecution = useMemo(
    () => task.identity === 10804 || task.identity === 10811,
    [task]
  )

  /**
   * 完成/重启事项
   * @param e 点击事件
   */
  const handleComplete = async (e?: React.MouseEvent) => {
    e?.stopPropagation()
    changeStatus?.()

    try {
      //   if (task.repeat_id && !task.repeat_type && task.finish_time) {
      //     message.warning({ content: '循环已取消, 不支持再次打开' })
      //     return
      //   }

      setUpdating(true)

      await setTimeoutForIdleCallback({
        timer: ANIMATION_DURATION
      })

      setUpdating(false)

      if (!task.dispatch_id) throw 'dispatch_id不存在'
      const state = changeCompleteState(task.state)
      await TaskDispatchApi.setTaskDispatchState(task.dispatch_id, {
        state
      })
    } catch (error) {
      resetStatus?.()
    }
  }

  const completeOnceMany = () => {
    console.log('TODO ')
  }

  const buildIcon = useMemoizedFn(() => {
    const { matter_type: matterType, finish_time: finishTime } = task
    if (
      matterType &&
      [
        ScheduleTaskConst.MatterType.matter,
        ScheduleTaskConst.MatterType.todo
      ].includes(matterType)
    ) {
      // 非我执行
      if (nonSelfExecution) return <DisabledIcon />
      // 完成动画
      if (updating)
        return (
          <img
            className={styles['checking']}
            src={checkingIcon}
            alt="checkingIcon"
          />
        )
      // 完成状态
      return task.finish_time ? (
        <CheckIcon onClick={handleComplete} />
      ) : (
        <UncheckIcon
          onClick={(e) => {
            e.stopPropagation()
            if (task.has_child) {
              setVisible(true)
              return
            }
            handleComplete(e)
          }}
        />
      )
    }

    if (ScheduleTaskConst.MatterType.meeting === matterType) {
      return !finishTime ? <MeetingIcon /> : <MeetingFinishedIcon />
    }

    if (ScheduleTaskConst.MatterType.timeCollect === matterType) {
      return !finishTime ? <TimeCollectIcon /> : <TimeCollectFinishIcon />
    }

    if (ScheduleTaskConst.MatterType.calendar === matterType) {
      return !finishTime ? <CalendarIcon /> : <CalendarFinish />
    }
  })

  return (
    <div className={styles['status-box']}>
      <AcceptOnceMany
        visible={visible} // 气泡框显示状态
        visibleChange={(v) => {
          setVisible(v)
        }} // 设置气泡框显隐
        // 仅一个的操作
        taskList={children}
        handleClickOnlyOne={handleComplete}
        // 批量操作
        handleClickAll={completeOnceMany}
        typeName="finish"
      >
        <div>{buildIcon()}</div>
      </AcceptOnceMany>
    </div>
  )
}

export const StatusBox = memo(_StatusBox)
