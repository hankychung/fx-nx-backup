import './config/index'
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@flyele-nx/service'
import { envStore } from '@flyele-nx/service'
import App from './app/pages/home'
import { AllRoutes } from './app/routes'

envStore.initEnv(process.env.NODE_ENV as string)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  </StrictMode>
)
