import { service, envStore } from '@flyele-nx/service'
import { ScheduleList } from '@flyele-nx/service-module'

envStore.initEnv(process.env.NODE_ENV as string)

service.updateToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODU5NTc5NDUsImlhdCI6MTY4NTk1MDE4MCwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxMzMxMzYzMzU0NTA5NDgyIiwiRGV2aWNlSUQiOiJkNzMzMDFiYi1mM2Q4LTQzZmItYWUyMy1lYWQ0M2JiYzc5ZmMiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.0LMdjTO9rwfcl0WT_CiBRFs5tHNuWlFgdwvXWBuTLjU'
)

export function App() {
  return (
    <>
      <ScheduleList date="2023-06-05" />
      <ScheduleList date="2023-06-02" />
      <ScheduleList date="2023-06-03" />
    </>
  )
}

export default App
