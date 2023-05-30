import UserSerializer from "../Serializers/UsersSerializer.js";
import { User } from "../../models/index.js";

class ReviewSerializer {
    static async showReviewDetails(reviewsArray) {
        const newReviews = Promise.all(reviewsArray.map(async(review) => {

            const userId = review.userId
            const user = await User.query().findById(userId)
            const userName = UserSerializer.showUserName(user)

            return {
                id: review.id,
                reviewText: review.reviewText,
                rating: review.rating,
                userName: userName,
                userId: userId,
            }
        }))
        return newReviews
    }

    static async serializeReview(review) {
        const userId = review.userId
        const user = await User.query().findById(userId)
        const userName = UserSerializer.showUserName(user)

        return {
            id: review.id,
            reviewText: review.reviewText,
            rating: review.rating,
            userName: userName,
            userId: userId
        }
    }
}

export default ReviewSerializer