import express from 'express'
import { vendorList ,loginVendor ,bookingsVendor,bookingComplete,bookingCancel,vendorDashboard,vendorProfile,updateVendorProfile } from '../controllers/vendorController.js'
import authVendor from '../middlewares/authVendor.js'

const vendorRouter = express.Router()

vendorRouter.get('/list',vendorList)
vendorRouter.post('/login',loginVendor)
vendorRouter.get('/bookings',authVendor,bookingsVendor)
vendorRouter.post('/complete-booking',authVendor,bookingComplete)
vendorRouter.post('/cancel-booking',authVendor,bookingCancel)
vendorRouter.get('/dashboard',authVendor,vendorDashboard)
vendorRouter.get('/profile',authVendor,vendorProfile)
vendorRouter.post('/update-profile',authVendor,updateVendorProfile)

export default vendorRouter