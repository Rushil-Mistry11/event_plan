import jwt from 'jsonwebtoken'

// vendor authentication middleware
const authVendor = async(req,res,next) =>{
  try
  {

    const {vtoken} =req.headers
    if(!vtoken)
    {
        return res.json({success:false,message:'Not authorized login again'})
    }
    const token_decode= jwt.verify(vtoken,process.env.JWT_SECRET) 
    req.user = { vendId: token_decode.id }; //similar like authUser

    next()

  }
  catch(error)
  {
    console.log(error);
    res.json({success:false,message:error.message})
  }
}

export default authVendor