import { useNavigate } from 'react-router-dom'
import { useMemoizedFn } from 'ahooks'
import { RoutePath } from '../../routes/const'
import { TokenHandler } from '@flyele-nx/utils'
import { SocketHandler } from '@flyele-nx/ws'
import { service } from '@flyele-nx/service'
// import {} from '@flyele-nx/service'

const FAKE_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTAyOTE2MTMsImlhdCI6MTY5MDI4Mzg0NywiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxMTEzNjU4MTcwMDE1ODQ5IiwiRGV2aWNlSUQiOiIxY2YxNzljZC03ZjRlLTQ5MTAtYmYxMS0xOWE0MmZhYTVlMzUiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.oMcm1IUx9Ox4orzoicmmtUouNvM6yYYrGJDsE0FrYhI'

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
