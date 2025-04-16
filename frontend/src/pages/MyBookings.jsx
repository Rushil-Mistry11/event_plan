import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyBookings = () => {
  const { backendUrl, token ,getVendorsData } = useContext(AppContext)
  const [bookings, setBookings] = useState([])
  const months =["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const slotDateFormat = (slotDate) =>{
      const dateArray = slotDate.split('_')
      return dateArray[0]+ " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  const getUserBookings = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/bookings', { headers: { token } })

      if (data.success) {
        setBookings(data.bookings.reverse()) // latest first
        console.log(data.bookings)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelBooking = async (bookingId) =>{
    try {
      
      const {data} = await axios.post(backendUrl + '/api/user/cancel-booking',{bookingId},{headers:{token}})
      if(data.success){
        toast.success(data.message)
        getUserBookings()
        getVendorsData()
      }
      else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserBookings()
    }
  }, [token])

  return (
    <div className='pb-3 mt-12 font-medium text-zinc-700 border-b'>
      <p>My Bookings</p>
      <div>
        {bookings.map((item, index) => (
          <div
            className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'
            key={index}
          >
            <div>
              <img className='w-32 bg-indigo-50' src={item.vendData?.image} alt='' />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.vendData?.name}</p>
              <p>{item.vendData?.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.vendData?.address?.line1}</p>
              <p className='text-xs'>{item.vendData?.address?.line2}</p>
              <p className='text-sm mt-1'>
                <span className='text-sm text-neutral-700 font-medium'>Date & time:</span>{' '}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            <div className='flex flex-col gap-2 justify-end'>
             {!item.cancelled && !item.isCompleted && <button onClick={()=>cancelBooking(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>
                Cancel booking
              </button>} 
              {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Booking cancelled</button>}
              {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyBookings
