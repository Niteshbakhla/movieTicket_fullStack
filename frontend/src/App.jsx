import React, { useEffect } from 'react'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'
import BookingPage from './pages/BookingPage'

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login")
  }, [])
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/' element={<Home />} />
          <Route path='/movie/:id' element={<MovieDetail />} />
          <Route path="/booking/:movieId/:showId" element={<BookingPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App