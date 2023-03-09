import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import InterestsIntroduction from './pages/interests-introduction'

export function App() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/interests-introduction')
  }, [navigate])

  return (
    <Routes>
      <Route path="/" element={<div>Loading</div>} />
      <Route
        path="/interests-introduction"
        element={<InterestsIntroduction />}
      />
    </Routes>
  )
}

export default App
