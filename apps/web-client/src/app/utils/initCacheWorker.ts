import { ServiceWorkerUtils } from '@flyele-nx/sw-sql-client'
import { ScheduleUtils } from '@flyele-nx/service-module'
import { envStore } from '@flyele-nx/service'
import { LocalStore } from '@flyele-nx/utils'

const initCacheWorker = async ({ userId }: { userId: string }) => {
  await ServiceWorkerUtils.login({
    token: LocalStore.getToken() as string,
    host: envStore.IsNxDev()
      ? 'http://localhost:8888/api/'
      : envStore.getHost(),
    userId,
    env: envStore.getEnv(),
    wasmUrl: '/assets/wasm/sql-wasm.wasm'
  })

  await ScheduleUtils.initTodayList()
}

export { initCacheWorker }
