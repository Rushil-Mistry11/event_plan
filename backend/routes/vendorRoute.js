import express from 'express'
import { vendorList } from '../controllers/vendorController.js'

const vendorRouter = express.Router()

vendorRouter.get('/list',vendorList)

export default vendorRouter