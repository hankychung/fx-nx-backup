import { service, envStore } from '@flyele-nx/service'
import { ScheduleList } from '@flyele-nx/service-module'

envStore.initEnv(process.env.NODE_ENV as string)

service.updateToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODcxNDc0NjYsImlhdCI6MTY4NzEzODg0MCwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxMzMxMzYzMzU0NTA5NDgyIiwiRGV2aWNlSUQiOiJmYWMwODJkMi04ZTRiLTQ0Y2UtYTZkNy1jMDEyODUxMjliMzAiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.kRWjSueRpQreB3pMqklpqXOMz-tKdXaQY5b3-NkEfJs'
)

export function App() {
  return <ScheduleList date="2023-06-19" />
}

export default App
