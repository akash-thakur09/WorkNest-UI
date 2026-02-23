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
import { PrivateRoute } from './components/PrivateRoute'

function App() {

  const {loading} = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/apply-leave"
        element={
          <PrivateRoute>
            <LeavePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/leave-requests"
        element={
          <PrivateRoute allowedRoles={['Admin', 'HR', 'Manager']}>
            <LeaveRequests />
          </PrivateRoute>
        }
      />
      <Route
        path="/departments"
        element={
          <PrivateRoute allowedRoles={['Admin', 'HR']}>
            <DepartmentPage />
          </PrivateRoute>
        }
      />

      {/* Catch-all route */}
      <Route path="*" element={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800">404</h1>
            <p className="text-gray-600 mt-2">Page Not Found</p>
          </div>
        </div>
      } />
    </Routes>
  )
}


export default App
