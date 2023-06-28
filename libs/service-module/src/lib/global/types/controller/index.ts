import {
  IScheduleTask,
  ProjectType,
  ScheduleTaskConst
} from '@flyele-nx/service'
import { Enter_page_detail } from '../sensor/matter'

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
  defaultTakers?: string[]
  matterType: ScheduleTaskConst.MatterType
  task: {
    id: string
    title: string
    parentId?: string
    project?: ProjectType.IBaseProjectInfo
  }
  sensor?: any
  conditionModel?: {
    modelName: string
    params: any
  }
  isWorkFlowAdd?: boolean //是否工作流邀请 默认false
  allTakerIds?: string[]
  chosenStep?: string
  isSmallTool?: boolean // 是否小工具
}
