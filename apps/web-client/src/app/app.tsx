import { service, envStore } from '@flyele-nx/service'
import { ScheduleList } from '@flyele-nx/service-module'

envStore.initEnv(process.env.NODE_ENV as string)

service.updateToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODY5MDU5MDgsImlhdCI6MTY4Njg5NzMxOCwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxNjU3MjM5MjkxMDM1Nzc3IiwiRGV2aWNlSUQiOiJjOGM5MWY1Zi1hYWRhLTRkNjMtOGIxMC1iM2JkMTk3MWYzMTAiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9._dHmygFcioWjqkbXWDhFHRd4YKp7K9Wn5ZpaLDjm3OE'
)

export function App() {
  return <ScheduleList date="2023-06-16" />
}

export default App
