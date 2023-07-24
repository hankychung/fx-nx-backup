import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/routes'
import { SocketHandler } from '@flyele-nx/ws'

import { envStore } from '@flyele-nx/service'
import { ServiceWorkerUtils } from '@flyele-nx/sw-sql-client'

const env = process.env.NODE_ENV as string

SocketHandler.initUrl(envStore.initEnv(env).url)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

ServiceWorkerUtils.registerServiceWorker(
  './assets/worker/cache-worker.js'
).then(() => {
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
})
