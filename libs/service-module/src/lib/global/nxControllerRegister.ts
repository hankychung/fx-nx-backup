import { IScheduleTask, ScheduleTaskConst } from '@flyele-nx/service'
import { Enter_page_detail } from './types/sensor/matter'

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

/**
 * nxController 控制器的注册器
 * 用于 注册外部方法 进 nx
 **/
class NxControllerRegister {
  ipcRenderer: any = null
  pubJs: any = null
  sensorTarget: any = null

  editTaskTime: any = null
  editTaskSummary: any = null
  openTaskDetail: any = null

  /**
   * ipc注册
   */
  ipcRendererRegister(ipc: any) {
    this.ipcRenderer = ipc
  }

  /**
   * pub注册
   */
  pubJsRegister(pubJs: any) {
    this.pubJs = pubJs
  }

  /**
   * sensorTarget 埋点注册
   */
  sensorSendRegister(callback: (type: string, data: any) => void) {
    this.sensorTarget = callback
  }

  /**
   * editTaskTime注册
   * 修改事项时间
   */
  editTaskTimeRegister(callback: (data: IEditTaskTime) => void) {
    this.editTaskTime = callback
  }

  /**
   * editTaskSummary注册
   * 修改事项总结
   */
  editTaskSummaryRegister(callback: (data: { task: IScheduleTask }) => void) {
    this.editTaskSummary = callback
  }

  /**
   * openTaskDetail注册
   * 打开事项详情弹窗
   */
  openTaskDetailRegister(callback: (data: IOpenTaskDetail) => void) {
    this.openTaskDetail = callback
  }
}

export const nxControllerRegister = new NxControllerRegister()
