import { service, envStore } from '@flyele-nx/service'
import { ScheduleList } from '@flyele-nx/service-module'

envStore.initEnv(process.env.NODE_ENV as string)

service.updateToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODY5MTg1NDAsImlhdCI6MTY4NjkxMDI2NSwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxNjU3MjM5MjkxMDM1Nzc3IiwiRGV2aWNlSUQiOiJjOGM5MWY1Zi1hYWRhLTRkNjMtOGIxMC1iM2JkMTk3MWYzMTAiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.9YXhbrrEMTfod-gK2fjxXqmcc3FsjUmmISiAIhXzZZo'
)

export function App() {
  return <ScheduleList date="2023-06-16" />
}

export default App
