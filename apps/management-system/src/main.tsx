// import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { AllRoutes } from './app/routes'
import { envStore } from '@flyele-nx/service'

envStore.initEnv(process.env.NODE_ENV as string)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <StrictMode>
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#1dd2c1'
      }
    }}
    locale={{
      ...zhCN,
      Pagination: {
        ...zhCN.Pagination,
        jump_to: '前往'
      }
    }}
  >
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  </ConfigProvider>
  // </StrictMode>
)
