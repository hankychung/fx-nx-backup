// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss'

import PayDetail from './pages/PayDetail'
import PayError from './pages/PayError'
import { Route, Routes } from 'react-router-dom'

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<div>Loading</div>} />
        <Route path="/payDetail" element={<PayDetail />} />
        <Route path="/payError" element={<PayError />} />
      </Routes>
      {/* END: routes */}
    </>
  )
}

export default App
