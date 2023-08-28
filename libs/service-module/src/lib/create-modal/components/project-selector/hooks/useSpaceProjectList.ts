/**
 author: william   email:362661044@qq.com
 create_at:2022/9/1 17:43
 **/
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRequest } from 'ahooks'
import { IProject } from '@flyele-nx/types'
import { workspaceApi } from '@flyele-nx/service'

type IProps = {
  spaceId: string
}

export const useSpaceProjectList = (props: IProps) => {
  const { spaceId } = props

  const [projectList, setProjectList] = useState<IProject[]>([])

  const runCount = useRef(0)

  const requestList = useCallback(() => {
    /** 有空间的 **/
    return workspaceApi.getProjectListMatch({
      workspace_id: spaceId,
      query_type: 1
    })
  }, [spaceId])

  const { run, loading } = useRequest(requestList, {
    manual: true,
    onSuccess: (res) => {
      if (res.data) {
        const list: IProject[] = res.data

        setProjectList([...list])
      }
    },
    onFinally: () => {
      runCount.current++
    }
  })

  useEffect(() => {
    spaceId && run()
  }, [spaceId, run])

  return {
    projectList,
    loading,
    run
  }
}
