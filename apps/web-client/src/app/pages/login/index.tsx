import { useNavigate } from 'react-router-dom'
import { useMemoizedFn } from 'ahooks'
import { RoutePath } from '../../routes/const'
import { TokenHandler } from '@flyele-nx/utils'
import { SocketHandler } from '@flyele-nx/ws'
// import {} from '@flyele-nx/service'

const FAKE_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODk5MTQ1MTAsImlhdCI6MTY4OTkwNjExOSwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxMDk3MTYyNjg4NTYxMjk2IiwiRGV2aWNlSUQiOiIwZGU2ZmVkOS1lNzYxLTRmNDItOWIzOC1mMDcwZWU2YzQ4ZWEiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.rZBsivMEdTqvWnZKXs4rf-7ayVCBjj2sTW1fFZV4Oqk'

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
