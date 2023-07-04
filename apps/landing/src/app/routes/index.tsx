import { useRoutes } from 'react-router-dom'
import Landing from '../pages/landing'
import App from '../pages/home'

export const routePath = {
  home: '/',
  landing: '/landing'
}

export const AllRoutes = () => {
  return useRoutes([
    {
      path: routePath.home,
      element: <App />
    },
    {
      path: routePath.landing,
      element: <Landing />
    }
  ])
}
