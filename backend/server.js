import express from "express";
import cors from 'cors';
import 'dotenv/config'
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import vendorRouter from "./routes/vendorRoute.js";
import userRouter from "./routes/userRoute.js";

//app config
const app= express()
const port= process.env.PORT || 4000
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true })); // f

// api endpoints
app.use('/api/admin',adminRouter)
app.use('/api/vendor',vendorRouter)
app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
    res.send('API working ')
})

app.listen(port,()=> console.log("Server started",port))