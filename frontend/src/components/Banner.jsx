import React from 'react'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate=useNavigate()
  return (
    <div className='flex bg-primary rounded-lg px-6 sm:px-10 md:px-10 lg:px-12 my-20 md:mx-10'>
        <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
            <p className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>Book Now</p>
            <p className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white mt-4'>With 100+trusted vendors</p>
        </div>
        <button onClick={()=>{navigate('/login')}} className='text-sm sm:text-base text-black-600 px-8 py-3 rounded-full mt-0 hover:scale-105 transition-all'>Create account</button>
    </div>
  )
}

export default Banner