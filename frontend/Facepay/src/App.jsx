import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ContactUs from './pages/Contact'
import About from './pages/About'
import Services from './pages/Services'
import Dashboard from './pages/Dashboard'
import VerifyOTP from './pages/VerifyOTP'
import ProfileCard from './components/ProfileCard'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/contact' element={<ContactUs showHeading={false}/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/services' element={<Services/>} />
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/verify' element={<VerifyOTP/>} />
      <Route path='/profile' element={<ProfileCard/>} />
    </Routes>
  )
}

export default App



