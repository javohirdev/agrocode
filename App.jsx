import { useState, useEffect } from 'react';
import './styles/App.css';
import { AuthProvider } from './AuthContext'
import { auth } from './config'
import { onAuthStateChanged } from 'firebase/auth'
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import VerifyEmail from './components/VerifyEmail';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => { setCurrentUser(user) })
  }, [])

  return (
    <Router>
      <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
        <Routes>
          <Route exact path='/' element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          <Route path="/login" element={
            !currentUser?.emailVerified
              ? <Login />
              : <Navigate to='/' replace />
          } />
          <Route path="/register" element={
            !currentUser?.emailVerified
              ? <Register />
              : <Navigate to='/' replace />
          } />
          <Route path='/verify-email' element={<VerifyEmail />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App;