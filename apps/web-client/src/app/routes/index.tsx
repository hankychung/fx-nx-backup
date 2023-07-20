import { createBrowserRouter, Navigate } from 'react-router-dom'

import App from '../app'
import { Login } from '../pages/login'
import { Board } from '../pages/board'
import { RoutePath } from './const'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [{ path: RoutePath.board, element: <Board /> }]
  },
  { path: RoutePath.login, element: <Login /> },
  { path: '*', element: <Navigate to="/" /> }
])

export { router }
