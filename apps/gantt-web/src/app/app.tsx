import React, { useEffect } from 'react'
import { Task, ViewMode } from '@flyele-nx/types'
import { Gantt } from '@flyele-nx/gantt'
import { ViewSwitcher } from '../../components/view-switcher'
// import { getStartEndDateForProject, initTasks } from './helper'
import { useGanttStore } from '@flyele-nx/zustand-store'
// import "gantt-task-react/dist/index.css";
import { projectApi } from '@flyele-nx/service'
import { useMemoizedFn } from 'ahooks'
// Init
const App = () => {
  const [view, setView] = React.useState<ViewMode>(ViewMode.Day)
  const [tasks, setTasks] = React.useState<Task[]>([])
  const [isChecked, setIsChecked] = React.useState(true)
  const { batchUpdateTask, updateList } = useGanttStore.getState()
  let columnWidth = 65
  if (view === ViewMode.Year) {
    columnWidth = 350
  } else if (view === ViewMode.Month) {
    columnWidth = 300
  } else if (view === ViewMode.Week) {
    columnWidth = 250
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

  const handleTaskDelete = (task: Task) => {
    const conf = window.confirm('Are you sure about ' + task.name + ' ?')
    if (conf) {
      setTasks(tasks.filter((t) => t.id !== task.id))
    }
    return conf
  }

  const handleProgressChange = async (task: Task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)))
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
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)))
    console.log('On expander click Id:' + task.id)
  }

  const getlist = useMemoizedFn(async () => {
    const res = await projectApi.getTaskListOfProject({
      page_record: 20,
      page_number: 1,
      show_mode: 2,
      projectId: '2630602957521067',
      query_type: 0,
      sort: 'desc'
    })
    console.log(res)
    const list: Task[] = res.data.map((item) => {
      return {
        ...item,
        start: item.start_time ? new Date(item.start_time * 1000) : new Date(),
        end: item.end_time ? new Date(item.end_time * 1000) : new Date(),
        name: item.title,
        id: item.task_id,
        type: 'task',
        hideChildren: false,
        displayOrder: 1
      }
    })
    if (res.code === 0) {
      console.log(list, 'list')

      setTasks(list)
      const { keys } = batchUpdateTask(list, { isFinished: false })

      updateList({
        list: keys
      })
    }
  })

  useEffect(() => {
    getlist()
  }, [getlist])

  return (
    <div className="Wrapper">
      <ViewSwitcher
        onViewModeChange={(viewMode) => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      {/* <h3>Gantt With Unlimited Height</h3>
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
        listCellWidth={isChecked ? "155px" : ""}
        columnWidth={columnWidth}
      /> */}
      <h3>甘特图</h3>
      {tasks.length > 0 && (
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
          listCellWidth={isChecked ? '155px' : ''}
          ganttHeight={700}
          columnWidth={columnWidth}
        />
      )}
    </div>
  )
}

export default App
