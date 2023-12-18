import { createBrowserRouter, Navigate } from 'react-router-dom'

import App from '../app'
import { Login } from '../pages/login'
import { Board } from '../pages/board'
import { RoutePath } from './const'
import { DayView } from '../pages/board/modules/day-view'
import { NoviceGuidePage } from '../pages/novice-guide-page'
import { Detail } from '../pages/detail'
import { WeekView } from '../pages/board/modules/week-view'
import { MonthView } from '../pages/month-view'

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
          },
          {
            path: RoutePath.weekView,
            element: <WeekView />
          },
          {
            path: RoutePath.monthView,
            element: <MonthView />
          }
        ]
      },
      {
        path: RoutePath.detail,
        element: <Detail />
      }
    ]
  },
  {
    path: RoutePath.login,
    element: <Login />
  },
  {
    path: RoutePath.noviceGuide,
    element: <NoviceGuidePage />
  },
  { path: '*', element: <DefaultPage /> }
])

export { router }
