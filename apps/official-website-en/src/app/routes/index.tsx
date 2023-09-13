import { useRoutes } from 'react-router-dom'
import App from '../pages/home'
import { DownloadPage } from '../pages/download'
import { ProductPage } from '../pages/product'
import InterestsIntroduction from '../pages/interests-introduction'

export const routePath = {
  home: '/',
  product: '/product',
  download: '/download',
  price: '/price'
}

export const AllRoutes = () => {
  return useRoutes([
    {
      path: routePath.home,
      element: <App />,
      children: [
        {
          path: routePath.product,
          element: <ProductPage />
        },
        {
          path: routePath.download,
          element: <DownloadPage />
        },
        {
          path: routePath.price,
          element: <InterestsIntroduction />
        }
      ]
    }
  ])
}
