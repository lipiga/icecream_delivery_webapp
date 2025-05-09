import ReviewModel from "../Models/reviewModel.js";

const addReview = async (req, res) => {
    try {
        const { productId, review } = req.body;
        const userId = req.body.userId; // Now properly coming from authMiddleware

        if (!productId || !review) {
            return res.status(400).json({
                success: false,
                message: "Product ID and review text are required"
            });
        }

        const newReview = new ReviewModel({
            productId,
            userId,
            review
        });

        await newReview.save();
        
        return res.status(201).json({
            success: true,
            message: "Review added successfully",
            data: newReview
        });

    } catch (error) {
        console.error("Error adding review:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const getReviewById = async(req,res) =>{
    const {productId} = req.params;
    try {
        const reviews = await ReviewModel.find({productId:productId});
        
        res.json({success:true,data:reviews});
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"can't take reviews"});
        
    }
}

export {getReviewById, addReview}