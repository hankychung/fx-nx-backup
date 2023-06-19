import { service, envStore } from '@flyele-nx/service'
import { ScheduleList } from '@flyele-nx/service-module'

envStore.initEnv(process.env.NODE_ENV as string)

service.updateToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODcxNjI2NjksImlhdCI6MTY4NzE1NTQxMiwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxMzMxMzYzMzU0NTA5NDgyIiwiRGV2aWNlSUQiOiI1MGNiZDIyNy0zOWE4LTQ1MTctYmViNy0xN2I5MzRmNWJmMGIiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.Ff_0qg5fNRjDfHYHpSsl2-PMmpPAvFf-mEX8Wc530GE'
)

export function App() {
  return <ScheduleList date="2023-06-19" />
}

export default App
