import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const AppContext= createContext()

const AppContextProvider=(props)=>{

    const currencySymbol='₹'
    const backendUrl= import.meta.env.VITE_BACKEND_URL
    const  [vendors,setVendors] = useState([])
    const [token,setToken]= useState(localStorage.getItem('token')?localStorage.getItem('token') : false)
    
    const [userData,setUserData] = useState(false)

    const getVendorsData = async () =>{

        try {

            const {data} = await axios.get(backendUrl + '/api/vendor/list')
            if(data.success){
                  setVendors(data.vendors)
            }
            else
            {
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const loadUserProfileData = async()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/user/get-profile' ,{headers:{token}})
            if(data.success){
                setUserData(data.user)  //used data.user instead of data.Userdata for solving req.user error
            }
            else
            {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }



    const value={
        vendors,getVendorsData,
        currencySymbol,
        token,setToken,
        backendUrl,
        userData,setUserData,
        loadUserProfileData
   }

    useEffect(()=>{
           getVendorsData()
    },[])

    useEffect(()=>{
        if(token){
            loadUserProfileData()
        }
        else
        {
            setUserData(false)
        }
    },[token])

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )


}

export default AppContextProvider