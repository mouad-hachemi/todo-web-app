import './App.css'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/sign-up' element={<SignUpPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
