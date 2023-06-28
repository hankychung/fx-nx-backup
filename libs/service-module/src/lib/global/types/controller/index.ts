import {
  IScheduleTask,
  ProjectType,
  ScheduleTaskConst
} from '@flyele-nx/service'
import { Enter_page_detail } from '../sensor/matter'
import { ICircleCheckBoxState } from '@flyele/flyele-components/dist/components/Base/CheckBox/type'

export interface IEditTaskTime {
  taskId: string
  task: IScheduleTask
  isCreator: boolean
  repeatType: number
  matterType: ScheduleTaskConst.MatterType
  remindAt: IScheduleTask['remind_at']
}

export interface IOpenTaskDetail {
  task: IScheduleTask
  enterPage: Enter_page_detail
}

export interface IHandlerTaskAddTaker {
  defaultTakers: string[]
  matterType: ScheduleTaskConst.MatterType
  task: {
    id: string
    title: string
    parentId?: string
    project: ProjectType.IBaseProjectInfo
  }
  sensor?: any
  conditionModel?: {
    modelName: string
    params: any
  }
  isSmallTool?: boolean // 是否小工具
}
