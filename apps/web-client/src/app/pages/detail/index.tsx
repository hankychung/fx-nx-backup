import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from '../../routes/const'
import { BizApi } from '@flyele-nx/service'

export const Detail = () => {
  const taskId = useMemo(() => window.location.href.split('?id=')[1], [])

  const navigate = useNavigate()

  useEffect(() => {
    console.log(taskId)

    BizApi.getTaskDetail({ taskId })
  }, [taskId])

  return <div onClick={() => navigate(RoutePath.board)}>back</div>
}
