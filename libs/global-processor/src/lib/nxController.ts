import { IScheduleTask } from '@flyele-nx/types'
import { nxControllerRegister } from './nxControllerRegister'
import { DayViewParamsProps } from '@flyele-nx/sql-store'
import {
  IEditTaskTime,
  IOpenTaskDetail,
  IHandlerTaskAddTaker
} from './types/controller'
import { Msg } from '@flyele-nx/ui'

/**
 * nxController
 * nx 控制器
 * nx 使用其方法用于调用外部的函数
 */
class GlobalNxController {
  /**
   * ipc invoke
   */
  ipcRendererInvoke(channel: string, params?: any) {
    if (nxControllerRegister.ipcRenderer) {
      try {
        nxControllerRegister.ipcRenderer.invoke(channel, params)
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
    if (nxControllerRegister.ipcRenderer) {
      try {
        nxControllerRegister.ipcRenderer.send(channel, params)
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
    if (nxControllerRegister.pubJs) {
      try {
        nxControllerRegister.pubJs.publish(message, data)
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
    console.log('埋点***', type, data)
    if (nxControllerRegister.sensorTarget) {
      try {
        nxControllerRegister.sensorTarget(type, data)
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
    if (nxControllerRegister.editTaskTime) {
      try {
        nxControllerRegister.editTaskTime(data)
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
    if (nxControllerRegister.editTaskSummary) {
      try {
        nxControllerRegister.editTaskSummary(data)
      } catch (e) {
        console.log('editTaskSummary 失败', e)
      }
    } else {
      console.log('editTaskSummary 未注册')
    }
  }

  /**
   * 点击事项卡片
   */
  openTaskDetailWindow(data: IOpenTaskDetail) {
    if (nxControllerRegister.openTaskDetail) {
      try {
        nxControllerRegister.openTaskDetail(data)
      } catch (e) {
        console.log('openTaskDetail 失败', e)
      }
    } else {
      console.log('openTaskDetail 未注册')
    }
  }

  /**
   * 点击事项邀请协作人
   */
  onHandlerTaskAddTaker(data: IHandlerTaskAddTaker) {
    if (nxControllerRegister.handlerTaskAddTaker) {
      try {
        nxControllerRegister.handlerTaskAddTaker(data)
      } catch (e) {
        console.log('handlerTaskAddTaker 失败', e)
      }
    } else {
      console.log('handlerTaskAddTaker 未注册')
    }
  }

  /**
   * 从缓存数据库获取日程
   */
  async getDayView(params: DayViewParamsProps) {
    return nxControllerRegister.getDayView(params)
  }

  /**
   * showMsg
   */
  showMsg(data: Msg) {
    if (nxControllerRegister.showMsg) {
      try {
        nxControllerRegister.showMsg(data)
      } catch (e) {
        console.log('showMsg 失败', e)
      }
    } else {
      console.log('showMsg 未注册')
    }
  }

  /**
   * electronShell shell控制器
   */
  electronShell(): any {
    if (nxControllerRegister.electronShell) {
      try {
        return nxControllerRegister.electronShell
      } catch (e) {
        console.log('shell.publish 失败', e)
        return null
      }
    } else {
      console.log('shell 未注册')
      return null
    }
  }

  updateWorkflowStep(option: { taskId: string }) {
    const { updateWorkflowStep } = nxControllerRegister

    if (!updateWorkflowStep) {
      console.error(`updateWorkflowStep 未注册`)
      return
    }

    updateWorkflowStep(option)
  }
}

export const globalNxController = new GlobalNxController()
