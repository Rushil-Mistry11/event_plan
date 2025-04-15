import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Vendors = () => {
    const {speciality} =useParams()
    const[filterVend,setFilterVend] =useState([])
    const navigate=useNavigate()

    const{vendors}=useContext(AppContext)

    const applyFilter=()=>{
        if(speciality)
        {
            setFilterVend(vendors.filter(vend=>vend.speciality=== speciality))
        }
        else
        {
            setFilterVend(vendors)
        }
    }

    useEffect(()=>{
          applyFilter()
    },[vendors,speciality])

  return (
    <div>
          <p className='text-gray-600'>Browse through all categories.</p>
          <div className='flex felx-col sm:flex-row item-start gap-5 mt-5'>
            <div className='flex flex-col gap-4 text-sm text-gray-600 cursor-pointer'>
                <p  onClick={()=>speciality === 'Venue selection' ? navigate('/vendors') : navigate('/vendors/Venue selection')} className='{`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Venue selection" ? "bg-indigo-100 text-black" : " "}`}'>Venue selection</p>

                <p onClick={()=>speciality === 'Caterers' ? navigate('/vendors') : navigate('/vendors/Caterers')}  className='{`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Caterers" ? "bg-indigo-100 text-black" : " "}`}'>Caterers</p>

                <p onClick={()=>speciality === 'Decorators' ? navigate('/vendors') : navigate('/vendors/Decorators')}  className='{`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Decorators" ? "bg-indigo-100 text-black" : " "}`}'>Decorators</p>

                <p onClick={()=>speciality === 'Entertainment' ? navigate('/vendors') : navigate('/vendors/Entertainment')}  className='{`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Entertainment" ? "bg-indigo-100 text-black" : ""}`}'>Entertainment</p>

               

                <p onClick={()=>speciality === 'Photography' ? navigate('/vendors') : navigate('/vendors/Photography')}  className='{`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Photography" ? "bg-indigo-100 text-black" : ""}`}'>Photography</p>
            </div>
            <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
                {
                   filterVend.map((item,index)=>(
                    <div onClick={()=>navigate(`/bookings/${item._id}`)} className='border border-blue-200 rounded-x1 overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                         <img className='bg-blue-50 ' src={item.image} alt="" />
                         <div className='p-4'>
                          <div className='flex items-centeer gap-2 text-sm text-center text-green-500'>
                          <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                          </div>
                          <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                          <p className='text-gray-600 text-sm'>{item.speciality}</p>
                      </div>
                      </div>
              ))
                }
            </div>
          </div>
    </div>
  )
}

export default Vendors