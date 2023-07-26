import { useNavigate } from 'react-router-dom'
import { useMemoizedFn } from 'ahooks'
import { RoutePath } from '../../routes/const'
import { TokenHandler } from '@flyele-nx/utils'
import { SocketHandler } from '@flyele-nx/ws'
import { service } from '@flyele-nx/service'
// import {} from '@flyele-nx/service'

const FAKE_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTAzNzAyNzYsImlhdCI6MTY5MDM2Mjk0NywiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxMTEzNjU4MTcwMDE1ODQ5IiwiRGV2aWNlSUQiOiIwMDA0Nzc0NTNhYTZmNTJiMDkyYTViOGIzZmM5YmM0ZDA0N2FlMThkMDU1ZGQzMWY1ZDU0NTNlYTMxZTE0MjFmIiwiUGxhdGZvcm0iOiJtb2JpbGUiLCJDbGllbnRWZXJzaW9uIjoiMi4zMC4xMCIsIlBob25lIjoiIiwiTmlja05hbWUiOiIiLCJBdmF0YXIiOiIifQ.TiKD2hvlYUUbZ6w3HOMy0HfJs69U2d4YwqbCmkSlJL4'

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
