import { service, envStore } from '@flyele-nx/service'
import { ScheduleList } from '@flyele-nx/service-module'

envStore.initEnv(process.env.NODE_ENV as string)

service.updateToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODcyMzM1NzMsImlhdCI6MTY4NzIyNTk3NiwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxMzMxMzYzMzU0NTA5NDgyIiwiRGV2aWNlSUQiOiIzOGMwZDQ4Mi01YzQyLTQxNDgtYTMyZS1iZGNkMTdkNTEwNDciLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.gD0KBrMpTAZNOf_gGLVM7HrE9hL4ZAce6QFQlA8fWOw'
)

export function App() {
  return <ScheduleList date="2023-06-20" />
}

export default App
