import { service, envStore } from '@flyele-nx/service'
import {
  ScheduleList,
  ContextMenu,
  contextMenuTool
} from '@flyele-nx/service-module'
import React from 'react'
import { useMessage } from '@flyele-nx/ui'

envStore.initEnv(process.env.NODE_ENV as string)

service.updateToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODgwMzU0MzgsImlhdCI6MTY4ODAyNzQxMiwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIyMzk1OTA4MjI3NzI3NTkwIiwiRGV2aWNlSUQiOiJjN2YzZWQ3Zi01MDUwLTRiZTItYTg2Yy1lOTJjOGIzNzFiMWIiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.QD40g93orVz9wy6DZLxprfvokrkkUyc_RAmuPSyV3aA'
)

export function App() {
  const [, , contextHolder] = useMessage()

  return (
    <>
      {contextHolder}
      <ScheduleList date="2023-06-29" isBoard={true} />
      <ContextMenu ref={(r) => contextMenuTool.registerContextMenu(r)} />
    </>
  )
}

export default App
