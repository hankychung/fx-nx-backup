import { useNavigate } from 'react-router-dom'
import { useMemoizedFn } from 'ahooks'
import { RoutePath } from '../../routes/const'
import { TokenHandler } from '@flyele-nx/utils'
import { SocketHandler } from '@flyele-nx/ws'
import { service } from '@flyele-nx/service'
// import {} from '@flyele-nx/service'

const FAKE_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTAzNDcxNjQsImlhdCI6MTY5MDMzODQyNSwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxMDk3MTYyNjg4NTYxMjk2IiwiRGV2aWNlSUQiOiIwMDA0Nzc0NTNhYTZmNTJiMDkyYTViOGIzZmM5YmM0ZDA0N2FlMThkMDU1ZGQzMWY1ZDU0NTNlYTMxZTE0MjFmIiwiUGxhdGZvcm0iOiJtb2JpbGUiLCJDbGllbnRWZXJzaW9uIjoiMi4zMC4xMCIsIlBob25lIjoiIiwiTmlja05hbWUiOiIiLCJBdmF0YXIiOiIifQ.6tc3Pc2i8JDsnGINtlICuEjkp7N-kJNmvNZzM4Lf_Rk'

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
