import express from 'express'
import { getUserById, loginUser,registerUser } from '../Controllers/userController.js'

const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/getuser/:userID",getUserById)

export default userRouter