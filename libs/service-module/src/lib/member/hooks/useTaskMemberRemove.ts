/**
 author: william   email:362661044@qq.com
 create_at:2023/1/11 9:44 AM
 **/

/**
 * 移除包含事项、会议、待办成员 hook
 * **/
import { useRequest } from 'ahooks'
// import Pub from '@utils/pubsub'
// import PUB from '@/constants/pubsub'
// import { TakersUtils } from '../utils/takers_utils'
import {
  // EConCheckStatus,
  // ITakerAndStatus,
  TaskDispatchApi
} from '@flyele-nx/service'
import { useUserInfoStore } from '../../store/useUserInfoStore'
import { useMessage } from '@flyele-nx/ui'

type IParams = {
  data: {
    taskId: string
    selectedTakerList: {
      userId: string
      dispatchId: string
      isCreator: boolean
    }[]
  }
  onSuccess?: () => void
  onError?: () => void
}

type IRunParams = {
  taskId: string
  onSuccess?: () => void
  onError?: () => void
} & IReduce

type IReduce = {
  exitMap: { userId: string[]; dispatchId: string[] }
  revokeMap: { userId: string[]; dispatchId: string[] }
}

/**
 * 为啥hook叫 task
 * 移出成员 包含事项、会议、待办逻
 * **/
export const useTaskMemberRemove = () => {
  const userId = useUserInfoStore((state) => state.userInfo.user_id)

  const [showMsg] = useMessage()

  // 退出事项
  const { run } = useRequest<any, [IRunParams]>(
    ({ exitMap, revokeMap }) => {
      const promiseArr = []

      if (exitMap.dispatchId.length > 0) {
        promiseArr.push(TaskDispatchApi.exitTask(exitMap.dispatchId.join(',')))
      }
      if (revokeMap.dispatchId.length > 0) {
        promiseArr.push(TaskDispatchApi.revokeTaker(revokeMap.dispatchId))
      }

      return Promise.all(promiseArr)
    },
    {
      manual: true,
      onSuccess: (_res: Promise<any>[], [params]) => {
        const { taskId, exitMap, revokeMap, onSuccess } = params

        // 退出事项
        if (exitMap.dispatchId.length > 0) {
          // Pub.publish(PUB.DELETE_MATTER_ITEM, [taskId])
        }

        // 移出协作人
        if (revokeMap.dispatchId.length > 0) {
          // const takerDiff: ITakerAndStatus[] = revokeMap.userId.map((id) => {
          //   return {
          //     ...TakersUtils.generateTakerData(id),
          //     status: EConCheckStatus.checked
          //   }
          // })
          // Pub.publish(PUB.TASK_DETAIL_UPDATE, {
          //   taskId,
          //   type: 'takers',
          //   action: 'remove',
          //   takerDiff
          // })
        }

        showMsg({
          msgType: '成功',
          content: '操作成功'
        })

        onSuccess && onSuccess()
      },
      onError: (_error, [params]) => {
        const { onError } = params

        showMsg({
          msgType: '错误',
          content: '移除失败'
        })
        onError && onError()
      }
    }
  )

  const taskMemberRemove = (params: IParams) => {
    const { data, onSuccess, onError } = params

    // 计算移出逻辑和退出事项逻辑
    const { exitMap, revokeMap } = data.selectedTakerList.reduce<IReduce>(
      (previousValue, item) => {
        // 当前是我,而且我不是创建人
        if (item.userId === userId && !item.isCreator) {
          // 退出事项
          previousValue.exitMap.dispatchId.push(item.dispatchId)
          previousValue.exitMap.userId.push(item.userId)
        } else {
          // 正常移出逻辑
          previousValue.revokeMap.dispatchId.push(item.dispatchId)
          previousValue.revokeMap.userId.push(item.userId)
        }
        return previousValue
      },
      {
        exitMap: { userId: [], dispatchId: [] },
        revokeMap: { userId: [], dispatchId: [] }
      }
    )

    run({ exitMap, revokeMap, taskId: data.taskId, onSuccess, onError })
  }

  return { taskMemberRemove }
}
