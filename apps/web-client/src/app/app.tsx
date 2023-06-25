import { service, envStore } from '@flyele-nx/service'
import {
  ScheduleList,
  ContextMenu,
  contextMenuTool
} from '@flyele-nx/service-module'
import React from 'react'

envStore.initEnv(process.env.NODE_ENV as string)

service.updateToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODc2NjQ0NDMsImlhdCI6MTY4NzY1NjAwOCwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxMzMxMzYzMzU0NTA5NDgyIiwiRGV2aWNlSUQiOiI5MTgwY2NkYi01M2QyLTQ0NWMtODE4Yy0zYzQ4NzcyNDRmOGQiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.5v6uKoJBPRaYmZoRfd6xFJaeFPxmgnQCuT-NFbFeGMY'
)

export function App() {
  return (
    <>
      <ScheduleList
        date="2023-06-25"
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
