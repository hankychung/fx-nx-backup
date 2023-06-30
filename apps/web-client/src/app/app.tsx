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
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODgwMzkzMTIsImlhdCI6MTY4ODAzMTk2OSwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIyNTk3MTA4Njk4MzE2ODA3IiwiRGV2aWNlSUQiOiI3NDM0ZTllYi01ZGNkLTQwYjQtOWQ5Ni01M2U4YThhZjI3MjMiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.PtV8vBUym3UdIXfv6496D9FyKPUtr4D8MbSWQMyPEJQ'
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
