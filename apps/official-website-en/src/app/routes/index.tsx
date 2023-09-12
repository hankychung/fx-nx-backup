import { useRoutes } from 'react-router-dom'
import InterestsIntroduction from '../pages/interests-introduction'
import App from '../pages/home'

export const routePath = {
  home: '/',
  product: '/product',
  download: '/download',
  price: '/price',
  contactUs: '/contact-us'
}

export const AllRoutes = () => {
  return useRoutes([
    {
      path: routePath.home,
      element: <App />,
      children: [
        {
          path: routePath.product,
          element: <InterestsIntroduction />
        },
        {
          path: routePath.download,
          element: <InterestsIntroduction />
        },
        {
          path: routePath.price,
          element: <InterestsIntroduction />
        },
        {
          path: routePath.contactUs,
          element: <InterestsIntroduction />
        }
      ]
    }
  ])
}
