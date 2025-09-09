
import './App.css'
import { useState } from 'react'
import ChatPage from './pages/ChatPage/ChatPage'
import Dashboard from './pages/Dashboard/Dashboard'
import backgroundImage from './assets/images/background.svg'

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'chat'>('dashboard')

  const handleNavigate = (href: string) => {
    if (href === '/') {
      setCurrentPage('dashboard')
    } else if (href === '/chat') {
      setCurrentPage('chat')
    }
  }

  const renderCurrentPage = () => {
    const currentHref = currentPage === 'dashboard' ? '/' : '/chat'

    switch (currentPage) {
      case 'chat':
        return <ChatPage currentPage={currentHref} onNavigate={handleNavigate} />
      case 'dashboard':
      default:
        return <Dashboard currentPage={currentHref} onNavigate={handleNavigate} />
    }
  }

  return (
    <div className="root-body">
      <img src={backgroundImage} alt="Background" className="background-image" />
      {renderCurrentPage()}
    </div>
  )
}

export default App
