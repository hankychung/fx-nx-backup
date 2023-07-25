import { useNavigate } from 'react-router-dom'
import { useMemoizedFn } from 'ahooks'
import { RoutePath } from '../../routes/const'
import { TokenHandler } from '@flyele-nx/utils'
import { SocketHandler } from '@flyele-nx/ws'
import { service } from '@flyele-nx/service'
// import {} from '@flyele-nx/service'

const FAKE_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTAyNzQwOTAsImlhdCI6MTY5MDI2NTk4MSwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIyNjAxNjgwNjk3MDMyNzE1IiwiRGV2aWNlSUQiOiIxZjljMWYwZS04MTExLTQ5NDAtODNiNy0zODk2YmJiZTFhMWEiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.JZbyMc7yO1Jc7xXzspvoJkvfbpuqx1i3WycIOgZ29bk'

const Login: React.FC = () => {
  const navigate = useNavigate()

  const login = useMemoizedFn(() => {
    TokenHandler.update(FAKE_TOKEN)

    service.updateToken(FAKE_TOKEN)

    navigate(RoutePath.dayView)

    SocketHandler.initSocket()
  })

  return <div onClick={login}>login</div>
}

export { Login }
