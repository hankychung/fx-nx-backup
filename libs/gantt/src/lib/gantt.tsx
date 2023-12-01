import React, {
  useEffect,
  useMemo,
  useImperativeHandle,
  ForwardRefRenderFunction,
  forwardRef,
  useState,
  useRef
} from 'react'
import { Task, IFullViewTask } from '@flyele-nx/types'
import {
  Enter_page_detail,
  FullShowMode,
  FullViewModeEnum
} from '@flyele-nx/constant'
import { useMemoizedFn } from 'ahooks'
import { TaskApi, projectApi } from '@flyele-nx/service'
import { useGanttList } from './hooks/useScheduleList'
import { Gantt } from './components/gantt/gantt'
// import { getFakeItem } from './utils'
import { ApiHandler } from './utils/apiHandler'
import dayjs from 'dayjs'
import { Pub } from '@flyele-nx/constant'
import { globalNxController } from '@flyele-nx/global-processor'
import { GanttHandler } from './utils/ganttHandler'
import { LoadingPage } from './components/LoadingPage'
export interface IGanttListRef {
  reload: () => void
}

const _GanttList: ForwardRefRenderFunction<
  IGanttListRef,
  { projectId: string; isinitGantt: boolean }
> = (
  { projectId, isinitGantt }: { projectId: string; isinitGantt: boolean },
  ref
) => {
  const { updateList, batchUpdateTask, taskDict, taskList, reSet } =
    useGanttList()
  const [view, setView] = React.useState<FullViewModeEnum>(FullViewModeEnum.Day)
  const isinit = useRef(false)
  const [fullShowMode, setFullShowMode] = useState(FullShowMode.group)
  const [showLoading, setShowLoading] = useState(true)
  let columnWidth = 65
  if (view === FullViewModeEnum.Year) {
    columnWidth = 350
  } else if (view === FullViewModeEnum.Month) {
    columnWidth = 300
  } else if (view === FullViewModeEnum.Week) {
    columnWidth = 250
  }

  useEffect(() => {
    ApiHandler.updateProjectId(projectId)
    GanttHandler.updateProjectId(projectId)
  }, [projectId])

  const pageParams = useRef({
    page_number: 1,
    page_record: 20
  })
  const loading = useRef<boolean>(false)
  const isFinished = useRef<boolean>(false)
  const fetchList = useMemoizedFn(async () => {
    if (!projectId || isFinished.current || loading.current) return
    loading.current = true
    let resList: Task[] = []
    const params = {
      show_mode: fullShowMode,
      projectId: projectId,
      query_type: 0,
      sort: 'desc',
      ...pageParams.current
    } as any
    const res = (await projectApi.getTaskListOfProject(params)).data
    loading.current = false
    setShowLoading(false)
    if (!res || !res.length) return
    if (res && res.length < 20) isFinished.current = true
    if (pageParams.current.page_number === 1) {
      pageParams.current.page_number++
      fetchList()
    }

    const filter = res?.filter((item: IFullViewTask) => {
      if (
        item.start_time &&
        (item.start_time > Math.floor(dayjs().add(2, 'year').unix()) ||
          item.start_time < Math.floor(dayjs().subtract(2, 'year').unix()))
      ) {
        return false
      }
      if (
        item.end_time &&
        (item.end_time > Math.floor(dayjs().add(2, 'year').unix()) ||
          item.end_time < Math.floor(dayjs().subtract(2, 'year').unix()))
      ) {
        return false
      }
      return true
    })
    const arr = filter?.map((i: IFullViewTask) => ({
      ...i,
      start: i.start_time ? new Date(i.start_time * 1000) : new Date(),
      end: i.end_time ? new Date(i.end_time * 1000) : new Date(),
      name: i.title,
      id: i.task_id,
      type: 'task',
      hideChildren: false,
      displayOrder: 1,
      parent_id: fullShowMode === FullShowMode.flat ? '' : i.parent_id,
      showMode: fullShowMode
    })) as unknown as Task

    resList = resList.concat(arr)

    const { keys } = batchUpdateTask(resList)

    updateList({ list: keys })
  })

  const reload = useMemoizedFn(async () => {
    pageParams.current.page_number = 1
    isFinished.current = false
    reSet()
    try {
      return await fetchList()
    } catch (error) {
      console.error(error)
    }
  })

  useImperativeHandle(ref, () => {
    return {
      reload
    }
  })
  useEffect(() => {
    reload()
  }, [projectId, reload, fullShowMode])

  // useEffect(() => {
  //   if (fullShowMode) {
  //     pageParams.current.page_number = 1
  //     isFinished.current = false
  //     reSet()
  //     reload()

  //     isinit.current = true
  //   }
  // }, [reload, fullShowMode, reSet])

  useEffect(() => {
    if (projectId && !isinit.current && isinitGantt) {
      pageParams.current.page_number = 1
      isFinished.current = false
      reSet()
      reload()

      isinit.current = true
    }
  }, [reload, projectId, reSet, isinitGantt])

  const handleTaskDelete = (task: Task) => {
    const conf = window.confirm('Are you sure about ' + task.name + ' ?')
    if (conf) {
      // setTasks(tasks.filter((t) => t.id !== task.id))
    }
    return conf
  }

  const handleProgressChange = async (task: Task) => {
    // setTasks(tasks.map((t) => (t.id === task.id ? task : t)))
    console.log('On progress change Id:' + task.id)
  }

  const handleDblClick = (task: Task) => {
    // alert('On Double Click event Id:' + task.id)
    globalNxController.openTaskDetailWindow({
      task: task as any,
      enterPage: Enter_page_detail.日程列表
    })
  }

  const handleClick = (task: Task) => {
    console.log('On Click event Id:' + task.id)
  }

  const handleSelect = (task: Task, isSelected: boolean) => {
    console.log(task.name + ' has ' + (isSelected ? 'selected' : 'unselected'))
  }

  const handleExpanderClick = (task: Task) => {
    // setTasks(tasks.map((t) => (t.id === task.id ? task : t)))
    console.log('On expander click Id:' + task.id)
  }

  const handleTaskChange = (task: Task) => {
    const start = dayjs(task.start).unix()
    const end = dayjs(task.end).unix()
    const params = {
      start_time: start,
      end_time: end,
      end_time_full_day: task.end_time_full_day,
      start_time_full_day: task.start_time_full_day,
      start: task.start,
      end: task.end,
      widget: {
        remind: true,
        time: true, // 汉杰说照家峰要求全部改成true, 有问题请找他
        repeat: true
      }
    }
    const newTask = {
      ...task,
      start_time: start,
      end_time: end
    }
    GanttHandler.batchModify({
      keys: [task.id],
      diff: { ...params }
    })

    TaskApi.updateTask(
      {
        ...params,
        matter_type: newTask.matter_type,
        start_time_full_day: 1,
        end_time_full_day: 1
      },
      newTask.task_id
    ).catch(() => {
      globalNxController.pubJsPublish(Pub.UPDATE_SCHEDULE, [task])
    })
    globalNxController.pubJsPublish(Pub.UPDATE_SCHEDULE, [newTask])
  }

  const tasks = useMemo(() => {
    const list =
      taskList && taskList.length > 0 && Object.keys(taskDict).length > 0
        ? taskList.map((item) => {
            const i = taskDict[item] as Task
            if (!i?.start) {
              return {
                ...taskDict[item],
                start: i.start_time
                  ? new Date(i.start_time * 1000)
                  : new Date(),
                end: i.end_time ? new Date(i.end_time * 1000) : new Date(),
                name: i.title,
                id: i.task_id,
                type: 'task',
                hideChildren: false,
                displayOrder: 1
              } as Task
            }
            return taskDict[item] as Task
          })
        : []

    return taskList.length > 0 ? [...list] || [] : []
  }, [taskDict, taskList])

  return (
    <div>
      {!showLoading && (
        <Gantt
          tasks={tasks}
          viewMode={view}
          onDateChange={handleTaskChange}
          onDelete={handleTaskDelete}
          onProgressChange={handleProgressChange}
          onDoubleClick={handleDblClick}
          onClick={handleClick}
          onSelect={handleSelect}
          onExpanderClick={handleExpanderClick}
          columnWidth={columnWidth}
          ganttHeight={640}
          fetchList={fetchList}
          pageParams={pageParams}
          loading={loading}
          setView={setView}
          setFullShowMode={setFullShowMode}
        />
      )}
      {showLoading && <LoadingPage />}
    </div>
  )
}

export const GanttList = React.memo(forwardRef(_GanttList))
