import React, { useRef, useEffect, useMemo } from 'react'
import { Task, IFullViewTask } from '@flyele-nx/types'
import { FullViewModeEnum } from '@flyele-nx/constant'
import { useMemoizedFn } from 'ahooks'
import { projectApi } from '@flyele-nx/service'
import fetchApiAllData from './utils/fetch-api-all-data'
import { useGanttList } from './hooks/useScheduleList'
import { Gantt } from './components/gantt/gantt'

export const GanttList = ({ projectId }: { projectId: string }) => {
  const { updateList, batchUpdateTask, taskDict, taskList } = useGanttList()
  const [view, _setView] = React.useState<FullViewModeEnum>(
    FullViewModeEnum.Day
  )
  let columnWidth = 65
  if (view === FullViewModeEnum.Year) {
    columnWidth = 350
  } else if (view === FullViewModeEnum.Month) {
    columnWidth = 300
  } else if (view === FullViewModeEnum.Week) {
    columnWidth = 250
  }

  const isInit = useRef(true)

  const fetchList = useMemoizedFn(async () => {
    let resList: Task[] = []

    const params = {
      show_mode: 2,
      projectId: projectId || '2630602957521067',
      query_type: 0,
      sort: 'desc'
    }

    await fetchApiAllData(projectApi, 'getTaskListOfProject', {
      queryParams: params,
      finishedFirstPageHandler: (res) => {
        const { data } = res

        resList = data?.map((i: IFullViewTask) => ({
          ...i,
          start: i.start_time ? new Date(i.start_time * 1000) : new Date(),
          end: i.end_time ? new Date(i.end_time * 1000) : new Date(),
          name: i.title,
          id: i.task_id,
          type: 'task',
          hideChildren: false,
          displayOrder: 1
        }))

        const { keys } = batchUpdateTask(resList, { isInit: true })

        // 初始化
        updateList({ list: keys, isInit: true })
        // setLoading(false)
      },
      responseHandler: (res) => {
        let { data } = res

        data = data?.map((i: IFullViewTask) => ({
          ...i,
          start: i.start_time ? new Date(i.start_time * 1000) : new Date(),
          end: i.end_time ? new Date(i.end_time * 1000) : new Date(),
          name: i.title,
          id: i.task_id,
          type: 'task',
          hideChildren: false,
          displayOrder: 1
        }))
        resList = resList.concat(data)
      }
    })
    const { keys } = batchUpdateTask(resList)

    updateList({ list: keys })
  })

  const reload = useMemoizedFn(async () => {
    try {
      return await fetchList()
    } catch (error) {
      console.error(error)
    }
  })
  useEffect(() => {
    if (isInit.current) {
      isInit.current = false

      reload()
    }
  }, [reload])

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
    alert('On Double Click event Id:' + task.id)
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
    console.log('On date change Id:' + task.id)
    // let newTasks = tasks.map((t) => (t.id === task.id ? task : t))
    // if (task.project) {
    //   const [start, end] = getStartEndDateForProject(newTasks, task.project)
    //   const project = newTasks[newTasks.findIndex((t) => t.id === task.project)]
    //   if (
    //     project.start.getTime() !== start.getTime() ||
    //     project.end.getTime() !== end.getTime()
    //   ) {
    //     const changedProject = { ...project, start, end }
    //     newTasks = newTasks.map((t) =>
    //       t.id === task.project ? changedProject : t
    //     )
    //   }
    // }
    // setTasks(newTasks)
  }

  const tasks = useMemo(() => {
    const list =
      taskDict &&
      taskList.map((item) => {
        return taskDict[item] as Task
      })
    return list || []
  }, [taskDict, taskList])
  return (
    <div>
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
      />
    </div>
  )
}
