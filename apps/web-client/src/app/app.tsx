import { service, envStore } from '@flyele-nx/service'
import { ScheduleList } from '@flyele-nx/service-module'

envStore.initEnv(process.env.NODE_ENV as string)

service.updateToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODY3NDA4NDQsImlhdCI6MTY4NjczMzA1NSwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxMzMxMzYzMzU0NTA5NDgyIiwiRGV2aWNlSUQiOiJjMWE1MTcwYy1hYTEyLTQxZWItODQyMC1kMTZkNTA4NWNlYzEiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.J7aSY4TUTTHGjmcxhKYKyXut6-JnYkT2mI0R6Q44__s'
)

export function App() {
  return <ScheduleList date="2023-06-14" />
}

export default App
