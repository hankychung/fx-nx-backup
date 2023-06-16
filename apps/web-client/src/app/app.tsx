import { service, envStore } from '@flyele-nx/service'
import { ScheduleList } from '@flyele-nx/service-module'

envStore.initEnv(process.env.NODE_ENV as string)

service.updateToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODY5MDg1MTAsImlhdCI6MTY4NjkwMDI3NSwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxMzMxMzYzMzU0NTA5NDgyIiwiRGV2aWNlSUQiOiJiOGZlZDljMy02ZDFiLTRhM2MtYjllMi0wNjk4YmNjOGJhNjIiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.nCYA9AIsVVXHhYQF-f13R0RDD52lJ9cuMvVKTHmw8xo'
)

export function App() {
  return <ScheduleList date="2023-06-16" />
}

export default App
