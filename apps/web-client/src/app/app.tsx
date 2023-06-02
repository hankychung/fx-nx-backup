import { service, envStore } from '@flyele-nx/service'
import { ScheduleList } from '@flyele-nx/service-module'

envStore.initEnv(process.env.NODE_ENV as string)

service.updateToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODU2MTg2MjUsImlhdCI6MTY4NTYxMDc2MywiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxMzMxMzYzMzU0NTA5NDgyIiwiRGV2aWNlSUQiOiIzODg0YTY4NC1hNzgzLTQ3OTctOGU1Ni00ZTVhNjc0NGZkNDciLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.loZRVWvO5s7OF5X7e6C1-bQ992g289gIZdBwyHa0thg'
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
