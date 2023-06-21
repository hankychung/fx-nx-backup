import { service, envStore } from '@flyele-nx/service'
import {
  ScheduleList,
  ContextMenu,
  contextMenuTool
} from '@flyele-nx/service-module'
import React from 'react'

envStore.initEnv(process.env.NODE_ENV as string)

service.updateToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODczMTg4OTgsImlhdCI6MTY4NzMxMTAwNCwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxMzMxMzYzMzU0NTA5NDgyIiwiRGV2aWNlSUQiOiI5Yjk1NTYzZS0zNWQwLTQ2NDUtODI4Yi03MDNjNDJmNDdkNDYiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.7bTO2TqW6oYLq32nyIY7W3pvDxb1lvyRM-xicZ3HrQU'
)

export function App() {
  return (
    <>
      <ScheduleList date="2023-06-21" />
      <ContextMenu ref={(r) => contextMenuTool.registerContextMenu(r)} />
    </>
  )
}

export default App
