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
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODc3Nzg5MjcsImlhdCI6MTY4Nzc3MTM4NiwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiI1NDI0MDg0MjE2NzExODUiLCJEZXZpY2VJRCI6ImU2MWQxMmEzLWY2NjYtNDZmMi1hOGY3LWUwZTYwZTQxZGMwNyIsIlBsYXRmb3JtIjoibW9iaWxlIiwiQ2xpZW50VmVyc2lvbiI6IjIuMzAuMTAiLCJQaG9uZSI6IiIsIk5pY2tOYW1lIjoiIiwiQXZhdGFyIjoiIn0.a6uStDg2iFFgp3GdGiB4eIN_V9noRLhWb2C405FO5FY'
)

export function App() {
  const [, , contextHolder] = useMessage()

  return (
    <>
      {contextHolder}
      <ScheduleList date="2023-06-26" />
      <ContextMenu ref={(r) => contextMenuTool.registerContextMenu(r)} />
    </>
  )
}

export default App
