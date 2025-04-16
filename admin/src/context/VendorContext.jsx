import axios from 'axios';
import {createContext, useState} from 'react';
import { toast } from 'react-toastify';

export const VendorContext = createContext()

const VendorContextProvider = (props) =>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [vToken,setVToken] = useState(localStorage.getItem('vToken')? localStorage.getItem('vToken'):'')
    const [bookings,setBookings] = useState([])
    const [dashData,setDashData] = useState(false)
    const [profileData,setProfileData] = useState(false)

    const getBookings = async () =>{
        try {
            const {data} = await axios.get(backendUrl + '/api/vendor/bookings' , {headers:{vToken}})
            if(data.success){
                setBookings(data.bookings)
                console.log(data.bookings);
                
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const completeBooking = async (bookingId) =>{
          try {
              const {data} = await axios.post(backendUrl + '/api/vendor/complete-booking',{bookingId},{headers:{vToken}})
              if(data.success){
                toast.success(data.message)
                getBookings()
              }
              else{
                toast.error(data.message)
              }
          } catch (error) {
            console.log(error)
            toast.error(error.message)
          }
    }

    const cancelBooking = async (bookingId) =>{
        try {
            const {data} = await axios.post(backendUrl + '/api/vendor/cancel-booking',{bookingId},{headers:{vToken}})
            if(data.success){
              toast.success(data.message)
              getBookings()
            }
            else{
              toast.error(data.message)
            }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
  }

  const getDashData = async () =>{
    try {
        const {data} = await axios.get(backendUrl + '/api/vendor/dashboard',{headers:{vToken}})
        if(data.success){
            setDashData(data.dashData)
            console.log((data.dashData));
            
        }
        else{
            toast.error(data.message)
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
  }

  const getProfileData = async ()=>{
    try {
        const {data} = await axios.get(backendUrl + '/api/vendor/profile',{headers:{vToken}})
        if(data.success){
            setProfileData(data.profileData)
            console.log(data.profileData);
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
  }

    const value = {
        vToken,setVToken,
        backendUrl,
        bookings,setBookings,
        getBookings,
        completeBooking,
        cancelBooking,
        dashData,setDashData,
        getDashData,
        profileData,setProfileData,
        getProfileData
    }

    return(
        <VendorContext.Provider value={value}>
            {props.children}
        </VendorContext.Provider>
    )
}

export default VendorContextProvider