// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect } from 'react'
import NxWelcome from './nx-welcome'
import { BizApi, service, envStore } from '@flyele-nx/service'
import { Route, Routes, Link } from 'react-router-dom'

envStore.initEnv(process.env.NODE_ENV as string)

export function App() {
  service.updateToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODU1MzQwMTMsImlhdCI6MTY4NTUyNjM0NiwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxMzMxMzYzMzU0NTA5NDgyIiwiRGV2aWNlSUQiOiIzOGI1YWE2OC0zZDdjLTQ5NWEtYjc5OS0zMzFjMWU4NWNmZDUiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.qPwWfhJe4FJWVNZTSQOPkx0ZBhnvYlWSqagTBnTIScw')

  useEffect(() => {
    BizApi.getScheduleList({ type: 'today' }).then((res) => {
      console.log('bizres', res)
    })
  }, [])

  return (
    <>
      <NxWelcome title="web-client" />

      <div />

      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </>
  )
}

export default App
