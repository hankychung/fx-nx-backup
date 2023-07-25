import { useNavigate } from 'react-router-dom'
import { useMemoizedFn } from 'ahooks'
import { RoutePath } from '../../routes/const'
import { TokenHandler } from '@flyele-nx/utils'
import { SocketHandler } from '@flyele-nx/ws'
// import {} from '@flyele-nx/service'

const FAKE_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTAyODA2ODUsImlhdCI6MTY5MDI3MTcxNCwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxMDk3MTYyNjg4NTYxMjk2IiwiRGV2aWNlSUQiOiIwMGE5ZGM1Ny00OTY5LTQ5ODUtYTBhYy0xNzlmYzllZDAzYjgiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.nmgvHcztBmi5N2AVjL2K29s4i7P10kI_VjQeLLtnpJw'

const Login: React.FC = () => {
  const navigate = useNavigate()

  const login = useMemoizedFn(() => {
    TokenHandler.update(FAKE_TOKEN)

    navigate(RoutePath.dayView)

    SocketHandler.initSocket()
  })

  return <div onClick={login}>login</div>
}

export { Login }
