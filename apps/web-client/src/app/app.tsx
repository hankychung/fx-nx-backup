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
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODg1NTI3NDAsImlhdCI6MTY4ODU0NDAzMCwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxMDk3MTYyNTk3MzM1MTg0IiwiRGV2aWNlSUQiOiI3MGU0MmUyZi0zNTVmLTQwYzgtOTMwOS0yZTY4OGIyM2QxYzUiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.FW2JgKS1LfGOwWLdCUw-nKzrqN3U6PFDzN5KXx-B9DA'
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
