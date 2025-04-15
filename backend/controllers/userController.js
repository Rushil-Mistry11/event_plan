import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import vendorModel from '../models/vendorModel.js'
import bookingModel from '../models/bookingModel.js'

// Api to register user
const registerUser = async (req,res)=>{
    try {
         
        const {name,email,password} = req.body

        if(!name || !password || !email){
            return res.json({success:false,message:"missing details"})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"enter valid email"})
        }

        if(password.length < 8){
            return res.json({success:false,message:"enter a strong password"})
        }

        // hashing user password

        const salt= await bcrypt.genSalt(10)
        const hashedPassword =await bcrypt.hash(password,salt)

        const userData ={
            name,
            email,
            password:hashedPassword,
        }

        const newUser = new userModel(userData)
        const user=await newUser.save()
        
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)

        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

// api for user login
const loginUser = async (req,res) =>{
     try {
         
        const {email,password} = req.body
        const user = await userModel.findOne({email})

        if(!user){
           return res.json({success:false,message:"User does not exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid credentials"})
        }

     } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
     }
}

// api to get user profile data

const getProfile = async (req,res) =>{
     
    try {
        const { userId } = req.user; //  From middleware
        const userData  = await userModel.findById(userId).select('-password')
        res.json({ success: true, user: userData });


    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

// api for update profile

const updateProfile= async (req,res) =>{
    try {

        const {name,phone,address,dob,gender} = req.body
        const imageFile=req.file
        const { userId } = req.user;

        if(!name || !phone || !dob || !gender){
            return res.json({success:true,message:"Data missing"})
        }

        await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})

        if(imageFile){
            // upload img to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId,{image:imageURL})
        }

        res.json({success:true,message:"Profile updated"})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

// api to book bookings
const bookBooking = async (req,res) =>{
       try {
          const {vendId,slotDate,slotTime} = req.body
          const { userId } = req.user; //use this otherwise there will be error of not getting userId ,because we used req.user in middleware authUser

          const vendData= await vendorModel.findById(vendId).select('-password')
          
          if(!vendData.available){
            return res.json({success:false,message:"Vendor not available"})
          }

          let slots_booked = vendData.slots_booked
          
          //checking for slots availability
          if(slots_booked[slotDate]){
                if(slots_booked[slotDate].includes(slotTime)){
                    return res.json({success:false,message:"Slot not available"})
                }
                else{
                    slots_booked[slotDate].push(slotTime)
                }
            }
            else{
                slots_booked[slotDate]= []
                slots_booked[slotDate].push(slotTime)
            }

            const userData = await userModel.findById(userId).select('-password')

            delete vendData.slots_booked

            const bookingData = {
                userId,
                vendId,
                userData,
                vendData,
                amount:vendData.prices,
                slotTime,
                slotDate,
                date:Date.now()
            }

            const newBooking = new bookingModel(bookingData)
            await newBooking.save()

            //save new slots data in vendData
            await vendorModel.findByIdAndUpdate(vendId,{slots_booked})

            res.json({success:true,message:'Booking booked'})


       } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
       }
}

// api to get user bookings for frontend my-bookings page
const listBooking = async (req,res) =>{
    try {
        const {userId} = req.user
        const bookings = await bookingModel.find({userId})

        res.json({success:true,bookings})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//api to cancel booking
const cancelBooking = async (req,res) =>{
    try {
        const {userId} = req.user
        const {bookingId} = req.body

        const bookingData= await bookingModel.findById(bookingId)

        // verify booking user
        if(bookingData.userId !== userId){
            return res.json({success:false,message:'Unauthorized action'})
        }

        await bookingModel.findByIdAndUpdate(bookingId,{cancelled:true})

        // releasing vendor slots

        const {vendId,slotDate,slotTime} = bookingData

        const vendorData = await vendorModel.findById(vendId)

        let slots_booked = vendorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e!== slotTime)

        await vendorModel.findByIdAndUpdate(vendId,{slots_booked})

        res.json({success:true,message:"Booking cancelled"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export {registerUser , loginUser , getProfile , updateProfile ,bookBooking , listBooking ,cancelBooking}