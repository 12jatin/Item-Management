import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import EditPage from './components/EditPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/edit" element={<EditPage />} />
      </Routes>
    </Router>
  )
}

export default App