import vendorModel from "../models/vendorModel.js";


const changeAvailablity = async (req,res) =>{
    try {

       const {vendId} = req.body

       const vendData = await vendorModel.findById(vendId)
       await vendorModel.findByIdAndUpdate(vendId,{available: !vendData.available})
       res.json({success:true,message:'Availability Changed'})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const vendorList = async (req,res) =>{
    try {

        const vendors = await vendorModel.find({}).select(['-password','-email'])
        res.json({success:true,vendors})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export {changeAvailablity,vendorList}