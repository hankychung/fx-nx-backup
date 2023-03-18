import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function App() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/interests-introduction')
  }, [navigate])

  return <div>Loading</div>
}

export default App
