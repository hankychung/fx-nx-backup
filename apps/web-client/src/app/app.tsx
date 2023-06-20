import { service, envStore } from '@flyele-nx/service'
import { ScheduleList } from '@flyele-nx/service-module'

envStore.initEnv(process.env.NODE_ENV as string)

service.updateToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODcyNTIwNTQsImlhdCI6MTY4NzI0NDQ1NCwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxNjU3MjM5MjkxMDM1Nzc3IiwiRGV2aWNlSUQiOiIzMjYyNjFkNC0xYWIxLTRiNDYtYmFkMS0xNDk4MTFiYTYwYmMiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.bMVtWQnMmsDk1ZrQPu15mGFhEQwKJCi2ZP8A57jTnB8'
)

export function App() {
  return <ScheduleList date="2023-06-20" />
}

export default App
