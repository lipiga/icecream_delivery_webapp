import express from "express"
import cors from "cors"
import { connectDB } from "./Config/db.js"
import foodRouter from "./Routes/foodRoute.js"
import userRouter from "./Routes/userRoute.js"
import "dotenv/config.js"
import cartRouter from "./Routes/cartRoute.js"
import orderRouter from "./Routes/orderRoute.js"
import ReviewRouter from "./Routes/reviewRoute.js"


//app config
const app = express()
const port =  process.env.PORT || 4000
//middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();

//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('Uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/api/review",ReviewRouter)


app.get("/",(req,res)=>{
    res.send("API working")
})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})
