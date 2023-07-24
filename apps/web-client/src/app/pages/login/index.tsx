import { useNavigate } from 'react-router-dom'
import { useMemoizedFn } from 'ahooks'
import { RoutePath } from '../../routes/const'
import { TokenHandler } from '@flyele-nx/utils'
import { SocketHandler } from '@flyele-nx/ws'
// import {} from '@flyele-nx/service'

const FAKE_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTAxODk0ODUsImlhdCI6MTY5MDE4MTY2NiwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxMTEzNjU4MTcwMDE1ODQ5IiwiRGV2aWNlSUQiOiIxYzllNzNiZi1jOGY3LTQwYzMtYTY5Yy1jMzFiMTVmMjBjYzIiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.eh0dxngaL_9hSVupqx5cBQO5Sv03YBGPGE8O0F-NVJc'

const Login: React.FC = () => {
  const navigate = useNavigate()

  const login = useMemoizedFn(() => {
    TokenHandler.update(FAKE_TOKEN)

    navigate(RoutePath.board)

    SocketHandler.initSocket()
  })

  return <div onClick={login}>login</div>
}

export { Login }
