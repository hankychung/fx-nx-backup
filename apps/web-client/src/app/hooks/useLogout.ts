import { useNavigate } from 'react-router-dom'
import { RoutePath } from '../routes/const'
import { LocalStore } from '@flyele-nx/utils'
import { useMemoizedFn } from 'ahooks'

export const useLogout = () => {
  const navigate = useNavigate()

  console.log('log out runnig')

  const handleLogout = useMemoizedFn(() => {
    LocalStore.clear()

    navigate(RoutePath.login)
  })

  return { handleLogout }
}
