import express from 'express';
import { addReview, getReviewById } from '../Controllers/reviewController.js';
import authMiddleware from '../Middleware/auth.js';

const router = express.Router();

// Protected route - requires valid JWT
router.post('/add', authMiddleware, addReview);
router.get('/getreview/:productId', getReviewById);

export default router;