import { Routes, Route } from 'react-router-dom'
import InterestsIntroduction from './pages/interests-introduction'

export function App() {
  return (
    <Routes>
      <Route
        path="/interests-introduction"
        element={<InterestsIntroduction />}
      />
    </Routes>
  )
}

export default App
