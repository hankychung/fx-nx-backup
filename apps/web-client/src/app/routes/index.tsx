import { createBrowserRouter, Navigate } from 'react-router-dom'

import App from '../app'
import { Login } from '../pages/login'
import { Board } from '../pages/board'
import { RoutePath } from './const'
import { TokenHandler } from '@flyele-nx/utils'

const DefaultPage = () => <Navigate to="/" />

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [{ path: RoutePath.board, element: <Board /> }]
  },
  {
    path: RoutePath.login,
    element: TokenHandler.get() ? <DefaultPage /> : <Login />
  },
  { path: '*', element: <DefaultPage /> }
])

export { router }
