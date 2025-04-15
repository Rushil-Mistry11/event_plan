import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
        <div className='text-center text-2xl pt-10 text-gray-500'>
          <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
        </div>
        <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>

          <img className='w-full md:max-w-[360px]' src={assets.gallery6} alt="" />
          <div className='flex flex-col justify-center items-start gap-6 '>
            <p className='font-semibold text-lg text-gray-600'>Our Office</p>
            <p className='text-gray-500'>tel:- +91 1714771421</p>
            <p className='text-gray-500'>planperfectly@gmail.com</p>
            <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore more</button>
          </div>
        </div>
    </div>
  )
}

export default Contact