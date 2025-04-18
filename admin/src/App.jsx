import React, { useContext } from 'react'
import Login from './pages/login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllBookings from './pages/Admin/AllBookings';
import AddVendor from './pages/Admin/AddVendor';
import VendorsList from './pages/Admin/VendorsList';
import { VendorContext } from './context/VendorContext';
import VendorBookings from './pages/Vendor/VendorBookings';
import VendorDashboard from './pages/Vendor/VendorDashboard';
import VendorProfile from './pages/Vendor/VendorProfile';


const App = () => {
   
  const {aToken} = useContext(AdminContext)
  const {vToken} = useContext(VendorContext)

  return aToken || vToken ?(
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/*admin route */}
           <Route path='/' element={<></>} />
           <Route path='/admin-dashboard' element={<Dashboard />} />
           <Route path='/all-bookings' element={<AllBookings />} />
           <Route path='/add-vendor' element={<AddVendor />} />
           <Route path='/vendor-list' element={<VendorsList />} />

           {/*vendor route */}
           <Route path='/vendor-dashboard' element={<VendorDashboard/>} />
           <Route path='/vendor-bookings' element={<VendorBookings />} />
           <Route path='/vendor-profile' element={<VendorProfile/>} />

        </Routes>
      </div>
    </div>
  ) : (
    <>
    <Login />
    <ToastContainer />
    </>
  )
}

export default App