import { service, envStore } from '@flyele-nx/service'
import { ScheduleList } from '@flyele-nx/service-module'

envStore.initEnv(process.env.NODE_ENV as string)

service.updateToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODYwNTcyNTMsImlhdCI6MTY4NjA0OTE4OSwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxMzMxMzYzMzU0NTA5NDgyIiwiRGV2aWNlSUQiOiI3MjUyNGY0My1iOTIyLTQ4NzAtYjJiNi1lY2ZhZWMyZGIwMzYiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.Wcgalabnw6H0Ybw_k1Jw5oYojS_UNHJx5xf71wru3LQ'
)

export function App() {
  return (
    <>
      <ScheduleList date="2023-06-06" />
      {/* <ScheduleList date="2023-06-02" />
      <ScheduleList date="2023-06-03" /> */}
    </>
  )
}

export default App
