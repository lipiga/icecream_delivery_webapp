import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://bhavapriya1603:bp394394@cluster0.thbxd.mongodb.net/grocify').then(()=>console.log("DB CONNECTED"))
}