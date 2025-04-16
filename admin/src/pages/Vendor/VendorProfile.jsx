import React, { useContext, useEffect, useState } from 'react'
import { VendorContext } from '../../context/VendorContext'
import { AppContext } from '../../context/AppCOntext'
import axios from 'axios'
import { toast } from 'react-toastify'

const VendorProfile = () => {

    const { vToken, profileData, setProfileData, getProfileData,backendUrl } = useContext(VendorContext)
    const { currency } = useContext(AppContext)

    const [isEdit, setIsEdit] = useState(false)

    const updateProfile = async () =>{
        try {
            const updateData={
                address:profileData.address,
                prices:profileData.prices,
                available:profileData.available
            }
            const {data} = await axios.post(backendUrl + '/api/vendor/update-profile',updateData,{headers:{vToken}})

            if(data.success){
                toast.success(data.message)
                setIsEdit(false)
                getProfileData()
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error);
        }
    }

    useEffect(() => {
        if (vToken) {
            getProfileData()
        }
    }, [vToken])

    return profileData && (
        <div>

            <div className='flex flex-col gap-4 m-5'>
                <div>
                    <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="" />
                </div>

                <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
                    <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
                    <div className='flex items-center gap-2 mt-1 text-gray-600'>
                        <p>{profileData.speciality}</p>
                    </div>

                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About:</p>
                        <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{profileData.about}</p>
                    </div>

                    <p className='text-gray-600 font-medium mt-4'>Prices:<span className='text-gray-800'>{currency}{isEdit ? <input type="number" onChange={(e) => setProfileData(prev => ({ ...prev, prices: e.target.value }))} value={profileData.prices} /> : profileData.prices}</span></p>

                    <div className='flex gap-2 py-2'>
                        <p>Address:</p>
                        <p className='text-sm'>{isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} /> : profileData.address.line1}</p><br />
                        <p>{isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} /> : profileData.address.line2}</p>
                    </div>

                    <div className='flex gap-1 pt-2'>
                        <input onChange={()=>isEdit && setProfileData(prev=>({...prev,available: !prev.available}))} checked={profileData.available} type="checkbox" name="" id="" />
                        <label htmlFor="">Available</label>
                    </div>
                    {
                        isEdit
                        ? <button onClick={updateProfile} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Save</button>
                        : <button onClick={() => setIsEdit(true)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>
                    }

                </div>
            </div>
        </div>
    )
}

export default VendorProfile