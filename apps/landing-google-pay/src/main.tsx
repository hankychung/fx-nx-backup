import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'

import App from './app/app'

import { envStore } from '@flyele-nx/service'

envStore.initEnv(process.env.NODE_ENV as string)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
