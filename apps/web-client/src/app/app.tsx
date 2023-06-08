import { service, envStore } from '@flyele-nx/service'
import { ScheduleList } from '@flyele-nx/service-module'

envStore.initEnv(process.env.NODE_ENV as string)

service.updateToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODYyMjEwMDksImlhdCI6MTY4NjIxMzA3NSwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIyNTM4MTcyNjkyMjk5ODcxIiwiRGV2aWNlSUQiOiJkMGJiNjU5ZS0yMmY4LTQ4OTUtODVhYS05NWZhYjMxMzEyNDEiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.RRdFvKxO9ZoosltOla-NkjDzsf8h6Hp6mzH3BDzge2c'
)

export function App() {
  return (
    <>
      <ScheduleList date="2023-06-08" />
      {/* <ScheduleList date="2023-06-02" />
      <ScheduleList date="2023-06-03" /> */}
    </>
  )
}

export default App
