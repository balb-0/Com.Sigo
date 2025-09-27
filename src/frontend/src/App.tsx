
import './App.css'
import { useCallback } from 'react'
import ChatPage from './pages/ChatPage/ChatPage'
import {Dashboard} from './pages/Dashboard/Dashboard'
import backgroundImage from './assets/images/background.svg'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavigate = useCallback((href: string) => {
    navigate(href)
  }, [navigate])

  return (
    <div className="root-body">
      <img src={backgroundImage} alt="Background" className="background-image" />
      <Routes>
        <Route path="/" element={<Dashboard currentPage={location.pathname + location.search} onNavigate={handleNavigate} />} />
        <Route path="/chat" element={<ChatPage currentPage={location.pathname + location.search} onNavigate={handleNavigate} />} />
      </Routes>
    </div>
  )
}

export default App
