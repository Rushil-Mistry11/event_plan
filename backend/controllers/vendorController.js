import vendorModel from "../models/vendorModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import bookingModel from "../models/bookingModel.js";

const changeAvailablity = async (req, res) => {
    try {

        const { vendId } = req.body

        const vendData = await vendorModel.findById(vendId)
        await vendorModel.findByIdAndUpdate(vendId, { available: !vendData.available })
        res.json({ success: true, message: 'Availability Changed' })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const vendorList = async (req, res) => {
    try {

        const vendors = await vendorModel.find({}).select(['-password', '-email'])
        res.json({ success: true, vendors })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// api for vendor login
const loginVendor = async (req, res) => {
    try {
        const { email, password } = req.body
        const vendor = await vendorModel.findOne({ email })

        if (!vendor) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, vendor.password)

        if (isMatch) {
            const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// api to get vendor booking for vendor panel

const bookingsVendor = async (req, res) => {
    try {
        const { vendId } = req.user  //similar like userContoller
        const bookings = await bookingModel.find({ vendId })

        res.json({ success: true, bookings })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// api to mark booking completed for vendor panel
const bookingComplete = async (req, res) => {
    try {
        const { vendId } = req.user
        const { bookingId } = req.body

        const bookingData = await bookingModel.findById(bookingId)

        if (bookingData && bookingData.vendId === vendId) {
            await bookingModel.findByIdAndUpdate(bookingId, { isCompleted: true })
            return res.json({ success: true, message: "Booking completed" })
        }
        else {
            return res.json({ success: false, message: "Mark failed" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// api to cancel booking for vendor panel
const bookingCancel = async (req, res) => {
    try {
        const { vendId } = req.user
        const { bookingId } = req.body

        const bookingData = await bookingModel.findById(bookingId)

        if (bookingData && bookingData.vendId === vendId) {
            await bookingModel.findByIdAndUpdate(bookingId, { cancelled: true })
            return res.json({ success: true, message: "Booking cancelled" })
        }
        else {
            return res.json({ success: false, message: "Cancellation failed" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//api to get dashboard data for vendor panel
const vendorDashboard = async (req, res) => {
    try {
        const { vendId } = req.user
        const bookings = await bookingModel.find({ vendId })

        //change if payment itegration is done to show earnings

        let users = []

        bookings.map((item) => {
            if (!users.includes(item.userId)) {
                users.push(item.userId)
            }
        })

        const dashData = {
            bookings: bookings.length,
            users: users.length,
            latestBookings: bookings.reverse().slice(0, 5)
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//api to get vendor profile for vendor panel
const vendorProfile = async (req, res) => {

    try {
        const { vendId } = req.user
        const profileData = await vendorModel.findById(vendId).select('-password')
        res.json({ success: true, profileData })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

//api to update vendor profile data from vendor panel
const updateVendorProfile = async (req, res) => {
    try {
        const { vendId } = req.user
        const { prices, address, available } = req.body

        await vendorModel.findByIdAndUpdate(vendId, { prices, address, available })
        res.json({ success: true, message: "Profile updated" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { changeAvailablity, vendorList, loginVendor, bookingsVendor, bookingComplete, bookingCancel, vendorDashboard, vendorProfile, updateVendorProfile }