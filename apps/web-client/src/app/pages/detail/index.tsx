import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from '../../routes/const'

export const Detail = () => {
  const taskId = useMemo(() => window.location.href.split('?id=')[1], [])

  const navigate = useNavigate()

  useEffect(() => {
    console.log(taskId)
  }, [taskId])

  return <div onClick={() => navigate(RoutePath.board)}>back</div>
}
