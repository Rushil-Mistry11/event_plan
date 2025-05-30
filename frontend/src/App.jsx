import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Vendors from './pages/vendors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Myprofile from './pages/Myprofile'
import MyBookings from './pages/MyBookings'
import Booking from './pages/Booking'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/vendors' element={<Vendors />}/>
        <Route path='/vendors/:speciality' element={<Vendors />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/my-profile' element={<Myprofile />}/>
        <Route path='/my-bookings' element={<MyBookings />}/>
        <Route path='/bookings/:vendId' element={<Booking />}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App