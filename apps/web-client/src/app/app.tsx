import { service, envStore } from '@flyele-nx/service'
import { ScheduleList } from '@flyele-nx/service-module'

envStore.initEnv(process.env.NODE_ENV as string)

service.updateToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODYwMzkxMzYsImlhdCI6MTY4NjAzMTgzMiwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxMzMxMzYzMzU0NTA5NDgyIiwiRGV2aWNlSUQiOiI3MjUyNGY0My1iOTIyLTQ4NzAtYjJiNi1lY2ZhZWMyZGIwMzYiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.msoDNbRAubwVNB7LtWmVAMIqFukUNt7XdhsPGsvM3xc'
)

export function App() {
  return (
    <>
      <ScheduleList date="2023-06-06" />
      <ScheduleList date="2023-06-02" />
      <ScheduleList date="2023-06-03" />
    </>
  )
}

export default App
