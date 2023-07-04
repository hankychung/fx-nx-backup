import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function App() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/landing')
  }, [navigate])

  return <div>Loading</div>
}

export default App
