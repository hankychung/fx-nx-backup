import { useRoutes } from 'react-router-dom'
import { HomePage } from '../pages/home'
import { LoginPage } from '../pages/login'
import { OrderManagement } from '../pages/order-management'
import { InvoiceManagement } from '../pages/invoice-management '

export const routePath = {
  home: '/',
  login: '/login',
  order: '/order-management',
  invoice: '/invoice-management'
}

export const AllRoutes = () => {
  return useRoutes([
    {
      path: routePath.login,
      element: <LoginPage />
    },
    {
      path: routePath.home,
      element: <HomePage />,
      children: [
        {
          path: routePath.order,
          element: <OrderManagement />
        },
        {
          path: routePath.invoice,
          element: <InvoiceManagement />
        }
      ]
    }
  ])
}
