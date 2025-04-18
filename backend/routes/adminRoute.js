import express from 'express'
import { addVendor,allVendors,loginAdmin ,bookingsAdmin ,bookingCancel ,adminDashboard} from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailablity } from '../controllers/vendorController.js'

const adminRouter=express.Router()

adminRouter.post('/add-vendor',authAdmin,upload.single('image'),addVendor)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-vendors',authAdmin,allVendors)
adminRouter.post('/change-availability',authAdmin,changeAvailablity)
adminRouter.get('/all-bookings',authAdmin,bookingsAdmin)
adminRouter.post('/cancel-booking',authAdmin,bookingCancel)
adminRouter.get('/dashboard',authAdmin,adminDashboard)

export default adminRouter