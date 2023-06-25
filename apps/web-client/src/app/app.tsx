import { service, envStore } from '@flyele-nx/service'
import {
  ScheduleList,
  ContextMenu,
  contextMenuTool
} from '@flyele-nx/service-module'
import React from 'react'

envStore.initEnv(process.env.NODE_ENV as string)

service.updateToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODc2OTA5MjcsImlhdCI6MTY4NzY4MjMyMywiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxNjU3MjM5MjkxMDM1Nzc3IiwiRGV2aWNlSUQiOiJkMTI5ODhhYy1kNTViLTRmYjktYmM5OC1jOGVmNTRhODBhM2QiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.NljXY-KwKoFApAOffehZsBoL4mV7tGYDSGy8y1hJfRw'
)

export function App() {
  return (
    <>
      <ScheduleList date="2023-06-25" />
      <ContextMenu ref={(r) => contextMenuTool.registerContextMenu(r)} />
    </>
  )
}

export default App
