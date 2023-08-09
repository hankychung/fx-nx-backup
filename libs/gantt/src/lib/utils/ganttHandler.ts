import { ProjectHandler } from '@flyele-nx/zustand-handler'

export let GanttHandler = new ProjectHandler('')

export const updateProjectId = (id: string) => {
  GanttHandler = new ProjectHandler(id)
}
