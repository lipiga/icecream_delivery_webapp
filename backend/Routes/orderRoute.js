import express from 'express'
import authMiddleware from '../Middleware/auth.js'
import { placeOrder } from '../Controllers/orderController.js'

const orderRouter = express.Router()

orderRouter.post("/place",authMiddleware,placeOrder)

export default orderRouter