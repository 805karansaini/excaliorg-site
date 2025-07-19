import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { PrivacyPolicy } from './pages/PrivacyPolicy'

function App() {
  return (
    <Router>
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Home />} />
        
        {/* Privacy Policy route */}
        <Route path="/policies/privacy-policy" element={<PrivacyPolicy />} />
        
        {/* Redirect /home to / */}
        <Route path="/home" element={<Navigate to="/" replace />} />
        
        {/* Catch-all route - redirect any unknown paths to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App