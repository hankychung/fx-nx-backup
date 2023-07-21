import { useNavigate } from 'react-router-dom'
import { useMemoizedFn } from 'ahooks'
import { RoutePath } from '../../routes/const'
import { TokenHandler } from '@flyele-nx/utils'
import { SocketHandler } from '@flyele-nx/ws'

const FAKE_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODk4NjU4OTEsImlhdCI6MTY4OTg1ODI0NywiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxMDk3MTYyNjg4NTYxMjk2IiwiRGV2aWNlSUQiOiJhY2ZiNTlmOS04M2RmLTQ2ZjUtYjc2Yi00MGQwZDM5MzI2NTgiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.XZlMcGNrumOKnRhnBcZ1ezMnVXF2WpODUNJ854DzoiA'

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
