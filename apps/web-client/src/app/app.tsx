import { service, envStore } from '@flyele-nx/service'
import { ScheduleList } from '@flyele-nx/service-module'

envStore.initEnv(process.env.NODE_ENV as string)

service.updateToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODU2MTIyMDQsImlhdCI6MTY4NTYwNDkzNywiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxMzMxMzYzMzU0NTA5NDgyIiwiRGV2aWNlSUQiOiIwNWNjZmI2Mi1mNWMwLTQ0M2QtYjQ1MC1hNGMxMzdmY2RjNjQiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.7S7Ov3szuv4BifpzKcJkpfWEOmt-1k6j28ZqI9TQHww'
)

export function App() {
  return (
    <>
      <ScheduleList date="2023-06-01" />
      <ScheduleList date="2023-06-02" />
      <ScheduleList date="2023-06-03" />
    </>
  )
}

export default App
