import userModel from "../Models/userModel.js"

//add to cart function
const addToCart = async (req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData

        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1
        }
        else{
            cartData[req.body.itemId] +=1 
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Added to cart"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
    }
}

//remove from cart function
const removeFromCart = async (req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData
        if (cartData[req.body.itemId]>0) {
            cartData[req.body.itemId] -=1
        } 
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Removed from cart"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
        
    }

}

//get cart items function
const getCart = async(req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData

        res.json({success:true,cartData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
    }

}


export {addToCart,removeFromCart,getCart}