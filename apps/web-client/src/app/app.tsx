import { service, envStore } from '@flyele-nx/service'
import { ScheduleList } from '@flyele-nx/service-module'

envStore.initEnv(process.env.NODE_ENV as string)

service.updateToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODY5MDM2NjksImlhdCI6MTY4Njg5NTc5NywiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxMzMxMzYzMzU0NTA5NDgyIiwiRGV2aWNlSUQiOiJhZDIyNzBhYS05NTQ2LTRjZjgtYTY3NC0zZmY0MjJjNWQ3YzIiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.dj6I7E0CzX1cPCIy1DLIgrRGknKvrqDMoEHqhorfy_I'
)

export function App() {
  return (
    <>
      <ScheduleList date="2023-06-16" />
      {/* <ScheduleList date="2023-06-02" />
      <ScheduleList date="2023-06-03" /> */}
    </>
  )
}

export default App
