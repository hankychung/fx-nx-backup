import { FC, memo, useMemo, useState } from 'react'
import {
  IScheduleTask,
  ScheduleTaskConst,
  TaskApi,
  TaskDispatchApi
} from '@flyele-nx/service'
import styles from './index.module.scss'
import {
  TaskCheckIcon,
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
import { changeCompleteState, getValuesByKey } from './utils'
import AcceptOnceMany from '../accept-once-many'
import { useScheduleStore } from '../schedule-list/utils/useScheduleStore'
import { message } from 'antd'
import { TaskHandler } from '../schedule-list/utils/taskHandler'
import dayjs from 'dayjs'
import { getChildrenDict, getKey } from '../schedule-list/utils'
import { WorkflowOperation } from '../workflow-operation'
import { getOperationStatus } from '../workflow-operation/utils'

interface IProps {
  task: IScheduleTask
  changeStatus?: () => void
  resetStatus?: () => void
}

const ANIMATION_DURATION = 900

const _StatusBox: FC<IProps> = (props) => {
  const { task, changeStatus, resetStatus } = props
  const [updating, setUpdating] = useState(false)
  const taskDict = useScheduleStore((state) => state.taskDict)

  const childrenDict = useScheduleStore((state) => state.childrenDict)
  const batchUpdateTask = useScheduleStore((state) => state.batchUpdateTask)
  const batchUpdateChildDict = useScheduleStore(
    (state) => state.batchUpdateChildDict
  )
  const childrenIds = useMemo(() => {
    return getValuesByKey(childrenDict, task.ref_task_id)
  }, [childrenDict, task])

  const [visible, setVisible] = useState(false)

  // 非我执行
  const nonSelfExecution = useMemo(
    () => task.identity === 10804 || task.identity === 10811,
    [task]
  )

  // 分发
  const dispatchApi = useMemoizedFn(async (isBatch?: boolean) => {
    const isRepeat = !!task.repeat_id

    // 循环事项
    if (isRepeat) {
      // 循环事项批量完成
      if (isBatch) {
        const repeated_tasks = childrenIds.map((i) => ({
          task_id: taskDict[i].ref_task_id,
          repeat_id: taskDict[i]?.repeat_id || ''
        }))
        // 把当前也加进去
        repeated_tasks.push({
          task_id: task.ref_task_id,
          repeat_id: task.repeat_id || ''
        })
        return TaskApi.repeatFinishBatch({ repeated_tasks })
      }
      // 循环事项重启
      else if (task.finish_time) {
        return TaskApi.repeatRestart({
          task_id: task.ref_task_id,
          repeat_id: task.repeat_id || ''
        })
      }
      // 循环事项完成
      return TaskApi.repeatFinish({
        task_id: task.ref_task_id,
        repeat_id: task.repeat_id || ''
      })
    }

    // 普通事项
    const state = changeCompleteState(task.state)
    return isBatch
      ? TaskDispatchApi.setTaskDispatchStateBatch(task.dispatch_id!, {
          state
        })
      : TaskDispatchApi.setTaskDispatchState(task.dispatch_id!, {
          state
        })
  })

  /**
   * 完成/重启事项
   * @param isBatch 是否批量完成
   */
  const handleComplete = async (isBatch?: boolean) => {
    changeStatus?.()
    setVisible(false)
    try {
      setUpdating(true)

      await setTimeoutForIdleCallback({
        timer: ANIMATION_DURATION
      })

      setUpdating(false)

      if (!task.dispatch_id) throw 'dispatch_id不存在'

      const state = changeCompleteState(task.state)

      TaskHandler.batchModify({
        keys: [task.ref_task_id],
        keysWithRepeatIds: [getKey(task)],
        diff: {
          finish_time: task.finish_time ? 0 : dayjs().unix(),
          state
        }
      })

      await dispatchApi(isBatch)
    } catch (error) {
      resetStatus?.()
    }
  }

  // 获取并更新子任务
  const getAndUpdateScheduleTree = useMemoizedFn(async () => {
    const { ref_task_id } = task
    const { data: tasks } = await TaskApi.getScheduleTree({
      taskId: ref_task_id
    })

    const childrenDict = getChildrenDict({
      tasks,
      originalId: ref_task_id
    })

    // 更新事项字典
    batchUpdateTask(
      tasks.map((child) => ({
        ...child,
        has_child: Boolean(childrenDict[child.ref_task_id])
      }))
    )

    batchUpdateChildDict(childrenDict)
  })

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

      if (task.flow_step_id && task.ref_task_id) {
        console.log('工作流应用***')

        return (
          <WorkflowOperation
            creator_id={task.creator_id}
            taskId={task.ref_task_id}
            curStepId={task.flow_step_id}
            complete_at={task.complete_at}
            size={14}
            status={getOperationStatus(task)}
            userId={'2490770669437163'}
            changeStatus={changeStatus}
          />
        )
      }
      // 完成状态
      return task.finish_time ? (
        <TaskCheckIcon
          onClick={(e) => {
            e.stopPropagation()
            handleComplete()
          }}
        />
      ) : (
        <UncheckIcon
          onClick={(e) => {
            e.stopPropagation()
            if (task.has_child) {
              getAndUpdateScheduleTree()
              setVisible(true)
              return
            }
            handleComplete()
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
        taskList={childrenIds}
        handleClickOnlyOne={handleComplete}
        handleClickAll={() => handleComplete(true)} // 批量操作
        typeName="finish"
      >
        <div>{buildIcon()}</div>
      </AcceptOnceMany>
    </div>
  )
}

export const StatusBox = memo(_StatusBox)
