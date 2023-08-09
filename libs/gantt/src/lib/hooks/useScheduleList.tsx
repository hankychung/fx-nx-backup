import { useProjectStore } from '@flyele-nx/global-processor'

export const useGanttList = () => {
  const taskList = useProjectStore((state) => state.taskList)
  const hoverId = useProjectStore((state) => state.hoverId)
  const activeCell = useProjectStore((state) => state.activeCell)
  const childrenDict = useProjectStore((state) => state.childrenDict)
  const taskDict = useProjectStore((state) => state.taskDict)
  const updateList = useProjectStore((state) => state.updateList)
  const batchUpdateTask = useProjectStore((state) => state.batchUpdateTask)
  const expandDict = useProjectStore((state) => state.expandDict)
  const batchUpdateChildDict = useProjectStore(
    (state) => state.batchUpdateChildDict
  )
  const batchUpdateHoverId = useProjectStore(
    (state) => state.batchUpdateHoverId
  )
  const batchUpdateActiveCell = useProjectStore(
    (state) => state.batchUpdateActiveCell
  )

  return {
    hoverId,
    taskList,
    childrenDict,
    activeCell,
    taskDict,
    updateList,
    expandDict,
    batchUpdateTask,
    batchUpdateHoverId,
    batchUpdateChildDict,
    batchUpdateActiveCell
  }
}
