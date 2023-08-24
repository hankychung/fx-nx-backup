import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useMemoizedFn, useRequest } from 'ahooks'
import { useSelector } from 'react-redux'
import { CommonResponse, IProject } from '@flyele-nx/types'
import { PROJECT_STATE } from '@flyele-nx/constant'
import { useUserInfoStore } from '@flyele-nx/zustand-store'
import { workspaceApi } from '@flyele-nx/service'

/**
 author: william   email:362661044@qq.com
 create_at:2022/8/10 17:58
 **/

type IProps = {
  spaceId?: string
  useUnsetProject?: boolean // 是否添加 不放入项目（个人事项）， 通常是没有空间 或  空间不是个人空间
}

export const PROJECT_UNSET = ''

export const unsetProject: IProject = {
  members: [],
  create_at: 0,
  creator_id: '',
  delay_task_total: 0,
  finished_task_total: 0,
  last_active_at: 0,
  member_total: 0,
  sort: 0,
  state: PROJECT_STATE.normal,
  task_total: 0,
  today_add_task_total: 0,
  today_delay_task_total: 0,
  today_finished_task_total: 0,
  unfinished_task_total: 0,
  project_id: PROJECT_UNSET, // 项目id
  project_name: '不放入项目（个人事项)', // 项目名称
  workspace_id: PROJECT_UNSET,
  ws_type: 2,
  workspace_level: 1
}

export const useProjectList = (props: IProps) => {
  const { spaceId, useUnsetProject = true } = props

  const userId = useUserInfoStore((state) => state.userInfo.user_id)

  // 项目列表
  const [projectList, setProjectList] = useState<IProject[]>([])

  // 第一次加载
  const firstLoad = useRef(false)

  /**
   * 硬颈的交互与硬颈后端
   * 交互非要这样定义，当前事项没有没团队空间都要把全部项目拉下来
   * 后端非要弄古灵精怪的接口，没有group by 没有分页，把所有数据捞出来自己组装
   * **/
  const requestList: () => Promise<CommonResponse<IProject[]>[]> =
    useMemoizedFn(() => {
      /** 有空间的 **/
      if (spaceId) {
        return Promise.all([
          workspaceApi.getProjectListMatch({
            workspace_id: spaceId,
            query_type: 3
          }),
          workspaceApi.getProjectListMatch({
            workspace_id: spaceId,
            query_type: 1
          })
        ])
      }

      /** 没有空间的 直接获取全部列表 **/
      return Promise.all([
        workspaceApi.getProjectListMatch({
          workspace_id: '10000',
          query_type: 3
        })
      ])
    })

  const { run, loading } = useRequest(requestList, {
    manual: true,
    onSuccess: (res) => {
      const [other, space] = res

      let _otherList: IProject[] = []
      let _spaceList: IProject[] = []

      if (other) {
        // 搞东西
        _otherList = other.data
      }
      if (space) {
        // 搞东西
        _spaceList = space.data
      }

      setProjectList([..._spaceList, ..._otherList])
    }
  })

  // 默认进来请求
  useEffect(() => {
    // getList()
    run()
    firstLoad.current = true
  }, [run])

  // 没有数据
  const isEmpty = useMemo(() => {
    return firstLoad.current && projectList.length === 0
  }, [projectList])

  // 项目列表
  const _projectList = useMemo<IProject[]>(() => {
    // 排序
    const list = [...projectList]

    if (useUnsetProject) {
      return [unsetProject, ...list]
    }
    return list
  }, [projectList, useUnsetProject])
  //TODO:这里要监听项目协作人发生改变
  // 项目协助人发送改变
  // useSubscribe({
  //   type: SUB.PROJECT_SELECTOR_LIST,
  //   handler: ({ socketData }) => {
  //     try {
  //       const detail = JSON.parse(socketData.diff.detail)
  //       const userIds = detail?.user_id ?? []

  //       if (userIds.includes(userId)) {
  //         run()
  //       }
  //     } catch (e) {
  //       console.log('*** handleGroupList parse error')
  //     }
  //   }
  // })

  // 解散项目
  // useSubscribe({
  //   type: SUB.PROJECT_52_DELETE_PROJECT,
  //   handler: () => {
  //     run()
  //   }
  // })

  return { projectList: _projectList, loading, getList: run, isEmpty }
}
