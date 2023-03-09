import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { LoginPage } from './page/login'

export function App() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/login')
  }, [navigate])

  return (
    <Routes>
      <Route path="/" element={<div>Loading</div>} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default App
