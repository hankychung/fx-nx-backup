import { service, envStore } from '@flyele-nx/service'
import {
  ScheduleList,
  ContextMenu,
  DayExecution,
  contextMenuTool
} from '@flyele-nx/service-module'
import React from 'react'
import { useMessage } from '@flyele-nx/ui'
import dayjs from 'dayjs'

envStore.initEnv(process.env.NODE_ENV as string)

service.updateToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODg0Njk2NjUsImlhdCI6MTY4ODQ2MDgzOSwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxNjU3MjM5MjkxMDM1Nzc3IiwiRGV2aWNlSUQiOiIyODM3MmNiZC01Y2U0LTQ4ZTEtOTg1OC1jMTZiOGVmMTRjMWQiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.OnbmhM-qw4xohZoVt78-nqgDjE1njRIZdwN5wgLLhno'
)

export function App() {
  const [, , contextHolder] = useMessage()

  return (
    <>
      {contextHolder}
      <div style={{ display: 'flex', gap: '50px' }}>
        <div
          style={{
            width: '380px',
            height: '390px'
          }}
        >
          <ScheduleList date="2023-07-04" isBoard={true} />
        </div>
        <div
          style={{
            width: '380px',
            height: '390px',
            backgroundColor: 'rgb(244, 244, 244)'
          }}
        >
          <DayExecution date={dayjs().unix()} />
        </div>
      </div>
      <ContextMenu ref={(r) => contextMenuTool.registerContextMenu(r)} />
    </>
  )
}

export default App
