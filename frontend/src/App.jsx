import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Register from './pages/register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import ProtectedRoute from './protection/ProtectedRoute'
import AuthRoute from './protection/AuthRoute'




function App() {

  return (
    <Routes>
    
      <Route
        path="/register"
        element={
          <AuthRoute>
            <Register />
          </AuthRoute>
        }
      />

      <Route
        path="/"
        element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        }
      />



      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />


      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/editprofile"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />


    </Routes>
  )
}

export default App
