import { service, envStore } from '@flyele-nx/service'
import { ScheduleList } from '@flyele-nx/service-module'

envStore.initEnv(process.env.NODE_ENV as string)

service.updateToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODYyODM1ODIsImlhdCI6MTY4NjI3NDkwMSwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIyNTM4MTcyNjkyMjk5ODcxIiwiRGV2aWNlSUQiOiJmZmRiMDFjNS1jMDMwLTRlNGItODJmYy04ODk2YjYzNjlmNzQiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.6URQgqtvVVV1Cy4Cy2dCBC5ECvJs7WeIK1V3LL2P-NU'
)

export function App() {
  return (
    <>
      <ScheduleList date="2023-06-09" />
      {/* <ScheduleList date="2023-06-02" />
      <ScheduleList date="2023-06-03" /> */}
    </>
  )
}

export default App
