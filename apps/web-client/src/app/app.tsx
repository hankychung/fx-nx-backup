import { service, envStore } from '@flyele-nx/service'
import {
  ScheduleList,
  ContextMenu,
  contextMenuTool
} from '@flyele-nx/service-module'
import React from 'react'

envStore.initEnv(process.env.NODE_ENV as string)

service.updateToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODczMjEwNjMsImlhdCI6MTY4NzMxMzQyMCwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxNjU3MjM5MjkxMDM1Nzc3IiwiRGV2aWNlSUQiOiI0MGI4MTc1My1hNjg5LTQ5YTItYWU5NC0yOTc3YmM5ODJmYmIiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.bcfSmfQoXW1S4fVR4q5QoHTDb0vvsjRyAYCRR3hvuR8'
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
