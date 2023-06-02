import { service, envStore } from '@flyele-nx/service'
import { ScheduleList } from '@flyele-nx/service-module'

envStore.initEnv(process.env.NODE_ENV as string)

service.updateToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODU2OTU3MTksImlhdCI6MTY4NTY4ODA3NiwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxMzMxMzYzMzU0NTA5NDgyIiwiRGV2aWNlSUQiOiJmYjRhNDVkYS1hNjhjLTRiOTUtYjA3Ni0wOTQ5M2ExZTRkOTUiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.Czt7vnO7wPY1iL2e10c0n9pEsUymLfFc6A1YR-3kEyQ'
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
