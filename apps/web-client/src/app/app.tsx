import { service, envStore } from '@flyele-nx/service'
import { ScheduleList } from '@flyele-nx/service-module'

envStore.initEnv(process.env.NODE_ENV as string)

service.updateToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODY1NjM5NDQsImlhdCI6MTY4NjU1NTg3MCwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxNjU3MjM5MjkxMDM1Nzc3IiwiRGV2aWNlSUQiOiJmNWFmMjY4NC1mOGI1LTQ4OTItOTRkMy03NTJhNWIwZWQ5YmIiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.5f_kXszgNh9Ww5yFLySdBr-AzYP8K6SVxyTKDKDrPS8'
)

export function App() {
  return (
    <>
      <ScheduleList date="2023-06-12" />
      {/* <ScheduleList date="2023-06-02" />
      <ScheduleList date="2023-06-03" /> */}
    </>
  )
}

export default App
