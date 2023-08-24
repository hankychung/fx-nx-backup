/**
 author: william   email:362661044@qq.com
 create_at:2022/8/11 14:44
 **/
import { useCallback, useState } from 'react'
import { useMemoizedFn, useRequest } from 'ahooks'
import {
  IBaseProjectInfo,
  IProjectGroup,
  IScheduleTask
} from '@flyele-nx/types'
import { projectApi } from '@flyele-nx/service'
import {
  globalNxController,
  useUserInfoStore
} from '@flyele-nx/global-processor'
import { AxiosError } from 'axios'
import { ErrorResponse, ICheckTaskComboResponse } from '@flyele-nx/constant'
import { useCheckVip } from '@flyele-nx/utils'

/**
 * 事项详情中选中项目分组
 * **/
type IProps = { projectId: string }

export const useMatterGroup = (props: IProps) => {
  const { projectId } = props

  // 分组列表
  const [groupList, setGroupList] = useState<IProjectGroup[]>([])

  // 请求列表
  const request = async () => {
    return projectApi.getGroup(projectId)
  }

  const { loading, run } = useRequest(request, {
    onSuccess: (data) => {
      if (data.data) {
        setGroupList(data.data)
      }
    }
  })

  // 创建分组
  const createGroup = useCallback(
    async (name: string): Promise<IProjectGroup | null> => {
      const _name = name.trim()

      if (!_name) {
        globalNxController.showMsg({
          content: '分组名不能为空！',
          msgType: '错误'
        })
        return null
      }

      try {
        const res = await projectApi.createGroup(projectId, { name })
        const { data } = res

        if (data) {
          await run()
          return data.data
        }
      } catch (err) {
        const { response } = err as AxiosError<ErrorResponse>

        if (response?.data.code === 40001) {
          globalNxController.showMsg({
            content: '最大支持50个分组',
            msgType: '错误'
          })
        } else {
          globalNxController.showMsg({
            content: response?.data.dbg_error ?? '设置失败',
            msgType: '错误'
          })
        }
      }
      return null
    },
    [projectId, run]
  )
  //TODO:JC......
  // useSubscribe(
  //   {
  //     type: SUB.PROJECT_GROUP_TRANSACTION,
  //     handler: (msg) => {
  //       const { projectId: _projectId } = msg

  //       if (_projectId === projectId) {
  //         run()
  //       }
  //     }
  //   },
  //   [projectId]
  // )

  return { groupList, loading, run, createGroup }
}

/***
 * 单独的业务hook
 * **/
type IMove = {
  parent_id?: string
  new_group_id: string
  group_id: string
  task_id: string
  projectId: string
}

type IChange = {
  project: IBaseProjectInfo // 选择的项目
  // curProject?: IBaseProjectInfo // 当前项目
  // appInfo?: ReturnType<typeof TaskUtils.getTaskAppInfo>
  taskId: string
  groupId: string
  beforeGroupId: string
}

type IUpdateDiff = {
  task_group_id?: string // 分组id
  task_group_name?: string // 分组名称
}

type IUpdateCache = {
  taskId: string // 多个id 用分号
  diff: IUpdateDiff
}

export const useMatterGroupTransaction = () => {
  const userId = useUserInfoStore((state) => state.userInfo.user_id)

  const { isValidVip } = useCheckVip()

  // 更新分组
  const updateGroup = useCallback(async (data: IMove) => {
    // 当前分组 和 修改后 一样不修改
    if (data.group_id === data.new_group_id) return true

    try {
      const res = await projectApi.moveGroupTask(data.projectId, {
        ...data
      })

      if (res.data) {
        //TODO:JC.......
        // Pub.publish(SUB.PROJECT_MATTER_GROUP_CHANGE, {
        //   groupId: data.new_group_id,
        //   taskId: data.task_id
        // })
        // Pub.publish(SUB.PROJECT_GROUP_LIST_REFRESH, {
        //   projectId: data.projectId
        // })
        return true
      }
    } catch (e) {
      globalNxController.showMsg({ msgType: '错误', content: '设置分组失败' })
      console.log(e)
    }
    return false
  }, [])

  // 更新项目与分组
  const changeProjectAndGroup = useMemoizedFn(async (data: IChange) => {
    // 当前分组 和 修改后 一样不修改
    if (data.groupId === data.beforeGroupId) return

    const { project } = data

    try {
      await projectApi.importTask({
        spaceId: project.workspace_id,
        projectTitle: project.project_name,
        projectId: project.project_id,
        taskIds: [data.taskId],
        task_group_id: data.groupId
      })

      //TODO:JC........
      // Pub.publish(SUB.DIY_01_REFRESH_SMALLTOOLS_DRAWER, data.taskId) // 刷新查看更多
      // Pub.publish(SUB.DIY_06_REFRESH_RELATION_TEMPTASK, {
      //   rid: data.taskId,
      //   type: 'project',
      //   handler: 'edit'
      // }) // 刷temp_task
      // // 通知关联项目变更
      // Pub.publish(SUB.UPDATE_REF_PROJECT, {
      //   task_id: data.taskId,
      //   project_id: project.project_id,
      //   project_name: project.project_name
      // })
    } catch (err) {
      const errData = (err as any).data.data as ICheckTaskComboResponse
      //TODO:JC.......
      // lureShowApiErrData({
      //   errData,
      //   isValidVip,
      //   userId,
      //   project: project ?? {}
      // })
      //TODO:JC.......

      // showMsg({ msgType: '错误', content: '项目分组修改失败' })
      // console.log(err)
    }
  })

  /**
   * 更新缓存
   * **/
  const updateGroupCache = useCallback((args: IUpdateCache) => {
    const { taskId, diff } = args

    const ids = taskId.split(',')

    // console.log('*** ids', ids)

    //TODO:JC.......
    // ids.forEach((id) => {
    //   Pub.publish(SUB.DB_INCREASE_01_READUX_AND_SQLITEDB, {
    //     task_id: id,
    //     diffObj: { task: { ...diff } }
    //   })

    //   PubSub.publish(SUB.PROJECT_MATTER_GROUP_CHANGE, {
    //     taskId,
    //     groupId: diff.task_group_id,
    //     groupName: diff.task_group_name
    //   })
    // })
    //TODO:JC.......
  }, [])

  return { updateGroup, changeProjectAndGroup, updateGroupCache }
}
