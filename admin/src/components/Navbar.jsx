import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { VendorContext } from '../context/VendorContext'

const Navbar = () => {
 
    const {aToken,setAToken} = useContext(AdminContext)
    const {vToken,setVToken} = useContext(VendorContext)

    const navigate = useNavigate()

    const logout = () =>{
        navigate('/') 
         aToken &&  setAToken('')
         aToken && localStorage.removeItem('aToken')
         vToken && setVToken('')
         vToken && localStorage.removeItem('vToken')
    }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center gap-2 text-xs'>
            <img className='w-36 sm:w-40 cursor-pointer' src={assets.logo1} alt="" />
            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin' : 'Vendor'}</p>
        </div>
        <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar