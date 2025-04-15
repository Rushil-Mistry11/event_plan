import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddVendor = () => {

    const [vendImg,setVendImg] = useState(false)
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [prices,setPrices] = useState('')
    const [about,setAbout] = useState('')
    const [speciality,setSPeciality] = useState('Venue selection')
    const [address1,setAddress1] = useState('')
    const [address2,setAddress2] = useState('')

    const {backendUrl,aToken} = useContext(AdminContext )

    const onSubmitHandler = async (event) =>{
         event.preventDefault()

         try {

            if(!vendImg){
                return toast.error('Image not selected')
            }
            
            const formData = new FormData()

            formData.append('image',vendImg)
            formData.append('name',name)
            formData.append('email',email)
            formData.append('password',password)
            formData.append('prices',Number(prices))
            formData.append('about',about)
            formData.append('speciality',speciality)
            formData.append('address',JSON.stringify({line1:address1,line2:address2}))

            //console log fomedata
            formData.forEach((value,key)=>{
                  console.log(`${key} : ${value}`);
                  
            })

            const {data} =await axios.post(backendUrl + '/api/admin/add-vendor',formData,{headers:{aToken}})

            if(data.success)
            {
                toast.success(data.message)
                setVendImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setAbout('')
                setPrices('')
            }
            else
            {
                toast.error(data.message)
            }
            
         } catch (error) {
            toast.error(error.message)
            console.log(error)
         }
    }

    return ( 
        <form onSubmit={onSubmitHandler} className='m-5 w-full'>
            <p className='mb-3 text-lg font-medium'>Add Vendor</p>
            <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
                <div className='flex items-center gap-4 mb-8 text-gray-500'>
                    <label htmlFor="vend-img">
                        <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={vendImg ? URL.createObjectURL(vendImg) :assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e)=> setVendImg(e.target.files[0])} type="file" id="vend-img" hidden />
                    <p>Upload vendor <br /> picture</p>
                </div>

                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Vendor Name</p>
                            <input onChange={(e)=> setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='name' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Vendor Email</p>
                            <input onChange={(e)=> setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type="email" placeholder='Email' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Vendor Password</p>
                            <input onChange={(e)=> setPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type="password" placeholder='Password' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Prices</p>
                            <input onChange={(e)=> setPrices(e.target.value)} value={prices} className='border rounded px-3 py-2' type="number" placeholder='Prices' required />
                        </div>
                    </div>

                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Category</p>
                            <select onChange={(e)=> setSPeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2' name="" id="">
                                <option value="Venue selection">Venue selection</option>
                                <option value="Caterers">Caterers</option>
                                <option value="Decorators">Decorators</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Photography">Photography</option>
                            </select>
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Address</p>
                            <input onChange={(e)=> setAddress1(e.target.value)} value={address1} className='border rounded px-3 py-2' type="text" placeholder='address 1' required />
                            <input onChange={(e)=> setAddress2(e.target.value)} value={address2} className='border rounded px-3 py-2' type="text" placeholder='address 2' required />
                        </div>
                    </div>

                </div>
                <div>
                    <p className='mt-4 mb-2'>About Vendor</p>
                    <textarea onChange={(e)=> setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' placeholder='write about vendor' row={5} required />
                </div>

                <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Add vendor</button>
            </div>
        </form>
    )
}

export default AddVendor