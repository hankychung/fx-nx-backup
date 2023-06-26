import { IScheduleTask, ScheduleTaskConst } from '@flyele-nx/service'

export interface IEditTaskTime {
  taskId: string
  task: IScheduleTask
  isCreator: boolean
  repeatType: number
  matterType: ScheduleTaskConst.MatterType
  remindAt: IScheduleTask['remind_at']
}

class GlobalNxController {
  private ipcRenderer: any = null
  private pubJs: any = null
  sensorTarget: any = null

  editTaskTime: any = null
  editTaskSummary: any = null

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
   * ipc invoke
   */
  ipcRendererInvoke(channel: string, params: any) {
    if (this.ipcRenderer) {
      try {
        this.ipcRenderer.invoke(channel, params)
      } catch (e) {
        console.log('ipcRenderer.invoke 失败', e)
      }
    } else {
      console.log('ipcRenderer 未注册')
    }
  }

  /**
   * ipc send
   */
  ipcRendererSend(channel: string, params: any) {
    if (this.ipcRenderer) {
      try {
        this.ipcRenderer.send(channel, params)
      } catch (e) {
        console.log('ipcRenderer.send 失败', e)
      }
    } else {
      console.log('ipcRenderer 未注册')
    }
  }

  /**
   * pub publish
   */
  pubJsPublish(message: string, data: any) {
    if (this.pubJs) {
      try {
        this.pubJs.publish(message, data)
      } catch (e) {
        console.log('pubJs.publish 失败', e)
      }
    } else {
      console.log('pubJs 未注册')
    }
  }

  /**
   * 发送埋点
   */
  sensorSend(type: string, data: any) {
    if (this.sensorTarget) {
      try {
        this.sensorTarget(type, data)
      } catch (e) {
        console.log('sensorSend 失败', e)
      }
    } else {
      console.log('sensorTarget 未注册')
    }
  }

  /**
   * 事项卡片修改事项时间
   * 需要外部弹出日期选择器
   */
  openEditTaskTime(data: IEditTaskTime) {
    if (this.editTaskTime) {
      try {
        this.editTaskTime(data)
      } catch (e) {
        console.log('editTaskTime 失败', e)
      }
    } else {
      console.log('editTaskTime 未注册')
    }
  }

  /**
   * 事项卡片修改事项总结
   * 需要外部弹出事项总结，弹出前的判断也要外部写
   */
  openEditTaskSummary(data: { task: IScheduleTask }) {
    if (this.editTaskSummary) {
      try {
        this.editTaskSummary(data)
      } catch (e) {
        console.log('editTaskSummary 失败', e)
      }
    } else {
      console.log('editTaskSummary 未注册')
    }
  }
}

export const globalNxController = new GlobalNxController()
