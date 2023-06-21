import { service, envStore } from '@flyele-nx/service'
import {
  ScheduleList,
  ContextMenu,
  contextMenuTool
} from '@flyele-nx/service-module'
import React from 'react'

envStore.initEnv(process.env.NODE_ENV as string)

service.updateToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODczNDUxNDQsImlhdCI6MTY4NzMzNzM5NCwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxNjU3MjM5MjkxMDM1Nzc3IiwiRGV2aWNlSUQiOiJlZDU1MTM2Zi0xZWNkLTQ0MTItYmVlNC0xZjI1M2Y3ODUyYmQiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.ziujSkM655pTS3mxM2CDa_C2-d6rKNGqTFXLXJwTpk8'
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
