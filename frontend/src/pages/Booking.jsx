import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Vendors from './vendors'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'

const Booking = () => {

  const {vendId}=useParams()
  const {vendors,currencySymbol,backendUrl,token,getVendorsData}=useContext(AppContext)
  const daysOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT']

  const navigate = useNavigate()

  const [vendInfo,setVendInfo] =useState(null)

  const [vendSLots,setVendSlots] =useState([])
  const [slotIndex,setSlotIndex] =useState(0)
  const [slotTime,setSlotTime] =useState('')
  
  const fetchVendInfo = async () =>{
    const vendInfo = vendors.find(vend => vend._id === vendId)
    setVendInfo(vendInfo)
  }

  const getAvailableSlots = async () =>{
      setVendSlots([])

      // getting current date
      let today=new Date()

      for(let i=0 ; i<31 ;i++){
        let currentDate = new Date(today)
        currentDate.setDate(today.getDate()+i)

        let endTime =new Date()
        endTime.setDate(today.getDate()+i)
        endTime.setHours(23,0,0,0)

        if(today.getDate() === currentDate.getDate()){
          currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
          currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
        }
        else{
          currentDate.setHours(8)
          currentDate.setMinutes(0)
        }

        let timeSlots= []

        while(currentDate < endTime) {
          let formattedTime= currentDate.toLocaleTimeString([],{hour :'2-digit',minute:'2-digit'})

          let day = currentDate.getDate()
          let month = currentDate.getMonth()+1
          let year = currentDate.getFullYear()

          const slotDate = day + "_" + month + "_" + year
          const slotTime = formattedTime

          const isSlotAvailable = vendInfo.slots_booked[slotDate] && vendInfo.slots_booked[slotDate].includes(slotTime) ? false : true
          if(isSlotAvailable){
            // add slot to array
            timeSlots.push({
              datetime: new Date(currentDate),
              time: formattedTime
            })
          }
 
          
          

          currentDate.setMinutes(currentDate.getMinutes() + 120)
        }

       setVendSlots(prev => ([...prev, timeSlots]))

      }
  }

  const bookBooking = async () =>{
       if(!token){
        toast.warn('Login to book')
        return navigate('/login')
       }

       try {
         const date= vendSLots[slotIndex][0].datetime
         let day = date.getDate()
         let month = date.getMonth()+1
         let year = date.getFullYear()

         const slotDate=day + "_" + month + "_" + year
          
         const {data}= await axios.post(backendUrl + '/api/user/book-booking',{vendId,slotDate,slotTime},{headers:{token}})
         if(data.success){
          toast.success(data.message) 
          getVendorsData()
          navigate('/my-bookings')
         }
         else{
          toast.error(data.message)
         }
         
       } catch (error) {
           console.log(error)
           toast.error(error.message)
       }
  }

  useEffect(()=>{
        fetchVendInfo()
  },[vendors,vendId])

  useEffect(()=>{
     getAvailableSlots()
  },[vendInfo])

  useEffect(()=>{
    console.log(vendSLots)
  },[vendSLots])

  return vendInfo &&(
    <div>
         {/*vendor details */}
         <div className='flex flex-col sm:flex-row gap-4'>
          <div>
               <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={vendInfo.image} alt="" />
          </div>

          <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
            <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
              {vendInfo.name}
              <img className='w-5' src={assets.verified_icon} alt="" />
            </p>
            <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
              <p>{vendInfo.speciality}</p>
            </div> 

            <div>
                 <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
                 <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{vendInfo.about}</p>
            </div>
            <p className='text-gray-500 font-medium mt-4'>Prices: <span className='text-gray-600'>{currencySymbol}{vendInfo.prices}</span></p>
          </div>
         </div>
         
         <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
          <p>Booking slots</p>
          <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
            {
              vendSLots.length && vendSLots.map((item,index)=>(
                <div onClick={()=> setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`} key={index}>
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))
            }
          </div>

          <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
            {vendSLots.length && vendSLots[slotIndex].map((item,index)=>(
                 <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`} key={index}> 
                    {item.time.toLowerCase()} 
                </p> 
            ))}
          </div>
          <button onClick={bookBooking} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book Now</button>

         </div>
    </div>
  )
}

export default Booking 