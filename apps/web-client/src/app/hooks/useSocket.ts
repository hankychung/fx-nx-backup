import { emitter } from '@flyele-nx/utils'
import { useEffect } from 'react'
import { ServiceWorkerUtils } from '@flyele-nx/sw-sql-client'
import { ScheduleUtils, ExecutionHandler } from '@flyele-nx/service-module'

export const useSocket = () => {
  useEffect(() => {
    emitter.on('updateDatabase', async () => {
      // 更新本地缓存数据库
      await ServiceWorkerUtils.updateDiff()

      // 刷新日程列表
      ScheduleUtils.reloadAllList()

      // 刷新当日事项列表
      ExecutionHandler.reloadList()
    })
  }, [])
}
