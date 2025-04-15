import axios from 'axios';
import {createContext, useState} from 'react';
import { toast } from 'react-toastify';

export const AdminContext = createContext()

const AdminContextProvider = (props) =>{

    const [aToken,setAToken] =useState(localStorage.getItem('aToken')? localStorage.getItem('aToken'):'')
    const [vendors,setVendors] = useState([])
    const [bookings,setBookings] = useState([])
    const [dashData,setDashData] = useState(false)

    const backendUrl= import.meta.env.VITE_BACKEND_URL

    const getAllVendors = async () =>{
        try {

          const {data} = await axios.post(backendUrl+ '/api/admin/all-vendors' ,{},{headers:{aToken}})
          if(data.success){
            setVendors(data.vendors)
            console.log(data.vendors);
          }
          else
          {
            toast.error(data.message)
          }
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    const changeAvailability = async (vendId) =>{
        try {

            const {data} = await axios.post(backendUrl + '/api/admin/change-availability', {vendId}, {headers:{aToken}})
            if(data.success){
                toast.success(data.message)
                getAllVendors()
            }
            else
            {
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAllBookings = async () =>{
        try {
            const {data} = await axios.get(backendUrl + '/api/admin/all-bookings',{headers:{aToken}})
            if(data.success){
                setBookings(data.bookings)
                console.log(data.bookings)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const cancelBooking = async (bookingId) =>{
          try {
            const {data} = await axios.post(backendUrl + '/api/admin/cancel-booking',{bookingId},{headers:{aToken}})
            if(data.success){
                toast.success(data.message)
                getAllBookings()
            }
            else{
                toast.error(data.message)
            }
          } catch (error) {
            toast.error(error.message)
          }
    }

    const getDashData = async ()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/admin/dashboard',{headers:{aToken}})
            if(data.success){
                setDashData(data.dashData)
                console.log(data.dashData)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
  
    const value = {
        aToken,setAToken,
        backendUrl,vendors,
        getAllVendors,changeAvailability,
        bookings,setBookings,
        getAllBookings,
        cancelBooking,
        dashData,getDashData
    }

    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider