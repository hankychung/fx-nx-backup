import { useNavigate } from 'react-router-dom'
import { useMemoizedFn } from 'ahooks'
import { RoutePath } from '../../routes/const'
import { TokenHandler } from '@flyele-nx/utils'

const FAKE_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODk4NDE0NDUsImlhdCI6MTY4OTgzMzMwMCwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxMDk3MTYyNjg4NTYxMjk2IiwiRGV2aWNlSUQiOiI3NTJkNjgwZS1mZTUyLTQ4NjMtOWEyMC1kMzY2YmFlMTkzZGUiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.FkvlW8tCuatyM13VMiQa2B0AlPwHJplp3yu8jfbj3lk'

const Login: React.FC = () => {
  const navigate = useNavigate()

  const login = useMemoizedFn(() => {
    TokenHandler.update(FAKE_TOKEN)

    navigate(RoutePath.board)
  })

  return <div onClick={login}>login</div>
}

export { Login }
