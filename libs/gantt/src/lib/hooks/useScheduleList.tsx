import { useGanttStore } from '@flyele-nx/global-processor'

export const useGanttList = () => {
  const taskList = useGanttStore((state) => state.taskList)
  const hoverId = useGanttStore((state) => state.hoverId)
  const activeCell = useGanttStore((state) => state.activeCell)
  const childrenDict = useGanttStore((state) => state.childrenDict)
  const taskDict = useGanttStore((state) => state.taskDict)
  const updateList = useGanttStore((state) => state.updateList)
  const batchUpdateTask = useGanttStore((state) => state.batchUpdateTask)
  const batchUpdateChildDict = useGanttStore(
    (state) => state.batchUpdateChildDict
  )
  const batchUpdateHoverId = useGanttStore((state) => state.batchUpdateHoverId)
  const batchUpdateActiveCell = useGanttStore(
    (state) => state.batchUpdateActiveCell
  )

  return {
    hoverId,
    taskList,
    childrenDict,
    activeCell,
    taskDict,
    updateList,
    batchUpdateTask,
    batchUpdateHoverId,
    batchUpdateChildDict,
    batchUpdateActiveCell
  }
}
