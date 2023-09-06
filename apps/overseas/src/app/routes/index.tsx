import { useRoutes } from 'react-router-dom'
import InterestsIntroduction from '../pages/reset-password'
import App from '../pages/home/app'

export const routePath = {
  home: '/',
  password: '/reset-password'
}

export const AllRoutes = () => {
  return useRoutes([
    {
      path: routePath.home,
      element: <App />
    },
    {
      path: routePath.password,
      element: <InterestsIntroduction />
    }
  ])
}
