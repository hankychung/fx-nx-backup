import { createBrowserRouter, Navigate } from 'react-router-dom'

import App from '../app'
import { Login } from '../pages/login'
import { Board } from '../pages/board'
import { RoutePath } from './const'
import { getToken } from '../utils'

const DefaultPage = () => <Navigate to="/" />

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [{ path: RoutePath.board, element: <Board /> }]
  },
  {
    path: RoutePath.login,
    element: getToken() ? <DefaultPage /> : <Login />
  },
  { path: '*', element: <DefaultPage /> }
])

export { router }
