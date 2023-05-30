import express from "express"
import { Review } from "../../../models/index.js"
import { ValidationError } from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js"
import ReviewSerializer from "../../../db/Serializers/ReviewsSerializer.js"
import uploadImage from "../../../services/uploadImage.js"

const gamesReviewsRouter = new express.Router({ mergeParams: true })

gamesReviewsRouter.post("/", uploadImage.single("image"), async (req, res) => {
    try {
        const { body } = req
        const imageUrl = req.file ? req.file.location : null
        const bodyWithImageUrl = { ...body, imageUrl: imageUrl }
        delete bodyWithImageUrl.image 
        const cleanedInput = cleanUserInput(bodyWithImageUrl)
        const userId = req.user.id
        const { id } = req.params
        cleanedInput.userId = userId
        cleanedInput.gameId = id
    
        const review = await Review.query().insertAndFetch(cleanedInput)
        const serializeReview = await ReviewSerializer.serializeReview(review)
        res.status(201).json({ review: serializeReview })
    } catch (error) {
        if(error instanceof ValidationError) {
            res.status(422).json({ errors: error.data })
        } else {
            res.status(500).json({ errors: error.message })
        }
    }
})

export default gamesReviewsRouter