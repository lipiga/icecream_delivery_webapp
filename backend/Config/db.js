import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://LipigaAlagarsamy:agipil175@cluster0.00nca4d.mongodb.net/chill-spot').then(()=>console.log("DB CONNECTED"))
}