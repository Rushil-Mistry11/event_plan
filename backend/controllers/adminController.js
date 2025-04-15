import validator from "validator"
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import vendorModel from "../models/vendorModel.js"
import jwt from 'jsonwebtoken'

//API for adding vendor
const addVendor =async(req,res) =>{
   try{
    const{name,email,password,speciality,about,prices,address} = req.body
    const imageFile=req.file
    
    // checkinf for all data to add vendor
    if(!name || !email || !password || !speciality || !about || !prices || !address)
    {
        return res.json({success:false,message:"Misiing details"})
    }

    //validating email format
    if(!validator.isEmail(email))
    {
        return res.json({success:false,message:"Please enter a valid email"})
    }

    //validating password
    if(password.length<8)
    {
        return res.json({success:false,message:"Please enter a valid password"})
    }
    
    //hashing vendor password
    const salt= await bcrypt.genSalt(10)
    const hashedPassword =await bcrypt.hash(password,salt)

    //upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
    const imageUrl =imageUpload.secure_url

    const vendorData ={
        name,
        email,
        image:imageUrl,
        password:hashedPassword,
        speciality,
        about,
        prices,
        address:JSON.parse(address),
        date:Date.now()
    }

    const newVendor =new vendorModel(vendorData)
    await newVendor.save()

    res.json({success:true,message:"Vendor added"})

   }
       catch(error){
           console.log(error);
           res.json({success:false,message:error.message})
       }

}

//API for admin login
const loginAdmin =async(req,res)=>{
   try
   {
         const {email,password} =req.body

         if(email=== process.env.ADMIN_EMAIL && password=== process.env.ADMIN_PASSWORD)
         {
            
            const token =jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})

         }
         else
         {
            res.json({success:false,message:"invalid credentials"})
         }
   }
   catch(error)
   {
        console.log(error);
        res.json({success:false,message:error.message})
   }
}

//api to get all vendors list for admin panel
const allVendors = async (req,res) =>{
    try {

        const vendors =await vendorModel.find({}).select('-password')
        res.json({success:true,vendors})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export {addVendor, loginAdmin ,allVendors}