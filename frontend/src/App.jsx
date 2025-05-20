import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Register from './pages/register'
import Login from './pages/Login'


function App() {

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      {/* <Route path="/profile" element={<Profile />} /> */}
    </Routes>
  )
}

export default App
