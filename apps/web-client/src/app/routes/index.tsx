import { createBrowserRouter, Navigate } from 'react-router-dom'

import App from '../app'
import { Login } from '../pages/login'
import { Board } from '../pages/board'
import { RoutePath } from './const'
import { LocalStore } from '@flyele-nx/utils'
import { DayView } from '../pages/board/modules/day-view'

const DefaultPage = () => <Navigate to="/" />

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: RoutePath.board,
        element: <Board />,
        children: [
          {
            path: RoutePath.dayView,
            element: <DayView />
          }
        ]
      }
    ]
  },
  {
    path: RoutePath.login,
    element: LocalStore.getToken() ? <DefaultPage /> : <Login />
  },
  { path: '*', element: <DefaultPage /> }
])

export { router }
