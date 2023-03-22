// import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'

import { AllRoutes } from './app/routes'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <StrictMode>
  <ConfigProvider
    locale={{
      locale: 'zh-cn',
      Pagination: {
        jump_to: '前往',
        page: '页'
      }
    }}
  >
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  </ConfigProvider>
  // </StrictMode>
)
