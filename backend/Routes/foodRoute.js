import express from "express"
import { addFood, listFood, removeFood,getFoodById } from "../Controllers/foodController.js"
import multer from "multer"

const foodRouter = express.Router();

//image storage engine

const storage = multer.diskStorage({
    destination:"Uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)
foodRouter.get("/:id", getFoodById);





export default foodRouter