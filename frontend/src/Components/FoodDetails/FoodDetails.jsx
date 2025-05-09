import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import './FoodDetails.css';
import FoodDisplay from '../FoodDisplay/FoodDisplay';

const FoodDetails = () => {
    const { id } = useParams();
    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');
    const [reviewLoading, setReviewLoading] = useState(false);
    const { url, token } = useContext(StoreContext);

    // Fetch food details
    useEffect(() => {
        const fetchFoodDetails = async () => {
            try {
                const response = await fetch(`${url}/api/food/${id}`);
                if (!response.ok) {
                    throw new Error('Food item not found');
                }
                const data = await response.json();
                setFood(data.data);
                fetchReviews(data.data._id);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFoodDetails();
    }, [id, url]);

    // Fetch reviews with user details
    const fetchReviews = async (productId) => {
        try {
            const response = await fetch(`${url}/api/review/getreview/${productId}`);
            const data = await response.json();
            
            if (data.success) {
                const reviewsWithUsers = await Promise.all(
                    data.data.map(async (review) => {
                        try {
                            const userResponse = await fetch(`${url}/api/user/getuser/${review.userId}`);
                            const userData = await userResponse.json();
                            const userName = userData.data?.name || userData.data?.data?.name || 'Anonymous';
                            return {
                                ...review,
                                userName
                            };
                        } catch (error) {
                            console.error("Error fetching user:", error);
                            return {
                                ...review,
                                userName: 'Anonymous'
                            };
                        }
                    })
                );
                setReviews(reviewsWithUsers);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    // Submit new review
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!newReview.trim()) {
            alert('Please write a review before submitting');
            return;
        }
        if (!token) {
            alert('Please login to submit a review');
            return;
        }

        setReviewLoading(true);
        try {
            // First submit the review
            const response = await fetch(`${url}/api/review/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token':token
                },
                body: JSON.stringify({
                    productId: id,
                    review: newReview
                })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to submit review');
            }

            if (data.success) {
                // Get current user's info
                const userResponse = await fetch(`${url}/api/user/getuser/${data.data.userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const userData = await userResponse.json();
                const userName = userData.data?.name || userData.data?.data?.name || 'Anonymous';

                // Update the reviews state immediately with the new review
                setReviews(prevReviews => [
                    {
                        ...data.data,
                        userName
                    },
                    ...prevReviews
                ]);
                
                setNewReview('');
                alert('Review submitted successfully!');
            }
        } catch (error) {
            console.error("Review submission error:", error);
            alert(error.message || 'Failed to submit review');
        } finally {
            setReviewLoading(false);
        }
    };

    if (loading) return <div className="fd-loading">Loading...</div>;
    if (error) return <div className="fd-error">Error: {error}</div>;
    if (!food) return <div className="fd-not-found">No food item found</div>;

    return (
        <div className="fd-page-container">
            <div className="fd-main-content">
                <div className="fd-container">
                    <div className="fd-image-container">
                        <img 
                            className="fd-image" 
                            src={`${url}/images/${food.image}`} 
                            alt={food.name} 
                        />
                    </div>
                    
                    <div className="fd-info">
                        <h2 className="fd-title">{food.name}</h2>
                        <p className="fd-description">{food.description}</p>
                        <p className="fd-price">Price: ₹{food.price}</p>
                        <p className="fd-category">Category: {food.category}</p>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="fd-reviews-section">
                <h3 className="fd-section-title">Customer Reviews ({reviews.length})</h3>
                
                {/* Review Form */}
                {token && (
                    <form onSubmit={handleReviewSubmit} className="fd-review-form">
                        <textarea
                            value={newReview}
                            onChange={(e) => setNewReview(e.target.value)}
                            placeholder="Share your thoughts about this product..."
                            rows={4}
                            required
                        />
                        <button type="submit" disabled={reviewLoading}>
                            {reviewLoading ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </form>
                )}

                {/* Reviews List */}
                <div className="fd-reviews-list">
                    {reviews.length === 0 ? (
                        <p className="fd-no-reviews">No reviews yet. {token ? 'Be the first to review!' : 'Login to add a review.'}</p>
                    ) : (
                        reviews.map((review) => (
                            <div key={review._id} className="fd-review-item">
                                <div className="fd-review-header">
                                    <span className="fd-user-name">{review.userName}</span>
                                </div>
                                <p className="fd-review-text">{review.review}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Related Products */}
            <div className="fd-related-products">
                <h3 className="fd-related-title">You might also like</h3>
                <FoodDisplay category={food.category} excludeId={food._id} />
            </div>
        </div>
    );
};

export default FoodDetails;