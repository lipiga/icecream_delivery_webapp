import foodModel from "../Models/foodModel.js";
import fs from 'fs'


// add food item

const addFood = async (req,res) =>{

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description:req.body.description,
        price : req.body.price,
        category:req.body.category,
        image : image_filename
    })
    try {
        await food.save();
        res.json({success:true,message:"Product added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}

// all food list
const listFood = async (req,res) =>{
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

//remove food item

const removeFood = async (req,res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`Uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Product deleted"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const getFoodById = async (req, res) => {
    try {
        const food = await foodModel.findById(req.params.id);
        if (!food) {
            return res.status(404).json({success: false, message: "Food item not found"});
        }
        res.json({success: true, data: food});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Error fetching food item"});
    }
}


export {addFood, listFood, removeFood,getFoodById}