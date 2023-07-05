import { service, envStore } from '@flyele-nx/service'
import {
  ScheduleList,
  ContextMenu,
  DayExecution,
  contextMenuTool,
  ProjectLure
} from '@flyele-nx/service-module'
import React from 'react'
import { useMessage } from '@flyele-nx/ui'
import dayjs from 'dayjs'

envStore.initEnv(process.env.NODE_ENV as string)

service.updateToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODg1NTg3OTgsImlhdCI6MTY4ODU1MTEyMywiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxMDk3MTYyNTU0ODY3ODU2IiwiRGV2aWNlSUQiOiI4ZGQyYmQ2NC0zYjdhLTRlYTAtYjRiZS1kODAxZDBiMTM0MDYiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.WdGscHa9rnexIPiZSUzzbRYm6cOqOdb4x0FUoV7jaVc'
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
      <ProjectLure visible />
    </>
  )
}

export default App
