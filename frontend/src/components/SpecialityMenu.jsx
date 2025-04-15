import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-800 px-4' id='speciality'>
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Find by Category</h1>
      <p className='text-center text-sm sm:text-base max-w-xl text-gray-600'>
        Simply browse through our extensive list of trusted vendors,
        <br className='hidden sm:block' />
        schedule your event hassle-free.
      </p>

      <div className='flex flex-wrap justify-center gap-6 pt-10 w-full'>
        {specialityData.map((item, index) => (
          <Link
            key={index}
            to={`/vendors/${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
            className='flex flex-col items-center transition-all hover:-translate-y-2 hover:text-blue-600 duration-300'
          >
            <img
              src={item.image}
              alt={item.speciality}
              className='w-14 sm:w-20 h-14 sm:h-20 object-contain mb-2'
            />
            <p className='text-xs sm:text-sm font-medium text-center'>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu
