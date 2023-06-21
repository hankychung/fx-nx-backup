import { service, envStore } from '@flyele-nx/service'
import {
  ScheduleList,
  ContextMenu,
  contextMenuTool
} from '@flyele-nx/service-module'
import React from 'react'

envStore.initEnv(process.env.NODE_ENV as string)

service.updateToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODczMzYzNDUsImlhdCI6MTY4NzMyODMwOCwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxNjU3MjM5MjkxMDM1Nzc3IiwiRGV2aWNlSUQiOiJlNTI4MDAxZi0wZTJlLTQ2ZjYtODUxMy1lZDMyYWM2ZDczY2EiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.5xKcixquBdrnTw12hh09inETyiJUDIzaOoA5Qt5lAkc'
)

export function App() {
  return (
    <>
      <ScheduleList
        date="2023-06-21"
        userId="1657239291035777"
        memberInfo={{
          contactDict: {},
          interacts: [],
          isEnterprise: false
        }}
      />
      <ContextMenu ref={(r) => contextMenuTool.registerContextMenu(r)} />
    </>
  )
}

export default App
