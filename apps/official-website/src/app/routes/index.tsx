import { useRoutes } from 'react-router-dom'
import InterestsIntroduction from '../pages/interests-introduction'
import App from '../pages/home'

export const routePath = {
  home: '/',
  introduction: '/interests-introduction'
}

export const AllRoutes = () => {
  return useRoutes([
    {
      path: routePath.home,
      element: <App />
    },
    {
      path: routePath.introduction,
      element: <InterestsIntroduction />
    }
  ])
}
