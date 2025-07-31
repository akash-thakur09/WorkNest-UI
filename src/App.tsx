import {Routes, Route } from 'react-router-dom'
import HomePage from './pages/Common/HomePage'
import LoginPage from './pages/Common/LoginPage'
import RegisterPage from './pages/Common/RegisterPage'
import ProfilePage from './pages/Common/ProfilePage'
import './index.css'
import './App.css'
import LeavePage from './pages/Common/LeavePage'
import LeaveRequests from './pages/Common/LeaveRequests'
import DepartmentPage from './pages/Common/DepartmentPage'
import { useAuth } from './hooks/useAuth'

// import PrivateRoute from './routes/PrivateRoute'

function App() {

  const {loading} = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
      <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes */}
      <Route
        path="/home"
        element={
          // <PrivateRoute>
            <HomePage />
          // </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          // <PrivateRoute>
            <ProfilePage />
          // </PrivateRoute>
        }
      />
      <Route
        path="/apply-leave"
        element={
          // <PrivateRoute>
            <LeavePage />
          // </PrivateRoute>
        } 

        />
        <Route
          path="/leave-requests"
          element = {
            <LeaveRequests/>
          }
          />
          <Route
          path="/departments"
          element = {
            <DepartmentPage/>
          }
          />

      {/* Catch-all route */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  )
}


export default App
