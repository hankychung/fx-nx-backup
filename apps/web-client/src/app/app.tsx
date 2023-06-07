import { service, envStore } from '@flyele-nx/service'
import { ScheduleList } from '@flyele-nx/service-module'

envStore.initEnv(process.env.NODE_ENV as string)

service.updateToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODYxMjc1NTAsImlhdCI6MTY4NjExOTI4NSwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIyNTM4MTcyNjkyMjk5ODcxIiwiRGV2aWNlSUQiOiIwOGUxOTI3MS1mNGU2LTQ0ZTgtOGE3My1jMGM0YWE3ZjIwYWIiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.hiGVcN-9kZsRTN-gSSz8Mlt-MR3ifjWLYZHreILnTEw'
)

export function App() {
  return (
    <>
      <ScheduleList date="2023-06-07" />
    </>
  )
}

export default App
