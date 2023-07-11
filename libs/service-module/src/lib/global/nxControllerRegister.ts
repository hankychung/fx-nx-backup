import { ILocalTask, IScheduleTask } from '@flyele-nx/service'
import { DayViewParamsProps } from '@flyele-nx/sql-store'
import {
  IEditTaskTime,
  IOpenTaskDetail,
  IHandlerTaskAddTaker
} from './types/controller'

/**
 * nxController 控制器的注册器
 * 用于 注册外部方法 进 nx
 **/
class NxControllerRegister {
  ipcRenderer: any = null
  pubJs: any = null
  sensorTarget: ((type: string, data: any) => void) | null = null

  editTaskTime: ((data: IEditTaskTime) => void) | null = null
  editTaskSummary: ((data: { task: IScheduleTask }) => void) | null = null
  openTaskDetail: ((data: IOpenTaskDetail) => void) | null = null
  handlerTaskAddTaker: ((data: IHandlerTaskAddTaker) => void) | null = null

  getDayView: (params: DayViewParamsProps) => {
    code: number
    data: {
      list: ILocalTask[]
      total?: number
    }
  } = () => ({
    code: 0,
    data: {
      list: [],
      total: 0
    }
  })

  /**
   * 从缓存数据库获取日程
   */
  getDayViewRegister(fn: any) {
    this.getDayView = fn
  }

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

  /**
   * handlerTaskAddTaker注册
   * 打开协作人邀请弹窗
   * key 从 ScheduleList 来，由外部传入，避免协助人弹窗出现多个的问题
   */
  handlerTaskAddTakerRegister(callback: (data: IHandlerTaskAddTaker) => void) {
    this.handlerTaskAddTaker = callback
  }
}

export const nxControllerRegister = new NxControllerRegister()
