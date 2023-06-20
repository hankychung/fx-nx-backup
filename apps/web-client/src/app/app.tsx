import { service, envStore } from '@flyele-nx/service'
import { ScheduleList } from '@flyele-nx/service-module'

envStore.initEnv(process.env.NODE_ENV as string)

service.updateToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODcyNTA2MDgsImlhdCI6MTY4NzI0MTY2OSwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxMzMxMzYzMzU0NTA5NDgyIiwiRGV2aWNlSUQiOiIzOGMwZDQ4Mi01YzQyLTQxNDgtYTMyZS1iZGNkMTdkNTEwNDciLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.mpZLeVWrkCp3-n72uPkCxIF3Eu3fFxMQ7_39Gul6hn8'
)

export function App() {
  return <ScheduleList date="2023-06-20" />
}

export default App
