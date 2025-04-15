import axios from 'axios';
import {createContext, useState} from 'react';
import { toast } from 'react-toastify';

export const AdminContext = createContext()

const AdminContextProvider = (props) =>{

    const [aToken,setAToken] =useState(localStorage.getItem('aToken')? localStorage.getItem('aToken'):'')
    const [vendors,setVendors] = useState([])
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
  
    const value = {
        aToken,setAToken,
        backendUrl,vendors,
        getAllVendors,changeAvailability,
    }

    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider