import express from "express"
import cors from "cors"
import { connectDB } from "./Config/db.js"
import foodRouter from "./Routes/foodRoute.js"
import userRouter from "./Routes/userRoute.js"
import "dotenv/config.js"
import cartRouter from "./Routes/cartRoute.js"
import orderRouter from "./Routes/orderRoute.js"
import path from "path"


//app config
const app = express()
const port = process.env.PORT || 4000

//middleware
app.use(express.json())
app.use(cors({
  origin: "https://mern-stack-main-frontend.onrender.com",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// db connection
connectDB();

//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",(req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins, or specify your frontend's origin
  next();
},express.static('Uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.get("/",(req,res)=>{
    res.send("API working")
})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})
