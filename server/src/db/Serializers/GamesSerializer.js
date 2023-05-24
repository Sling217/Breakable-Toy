import { Review } from "../../models/index.js"
import ReviewSerializer from "./ReviewsSerializer.js"

class GamesSerializer {
    static showDetailsForList (gamesArray) {
        const newGames = gamesArray.map((game) => {
            return {
                id: game.id,
                name: game.name,
                genres: game.genres,
            }
        })
        return newGames
    }

    static async detailsForShow (game) {
        const allowedAttributes = ["id", "name", "description", "platforms", "updatedAt"]

        let newGame = {}
        
        for (const attribute of allowedAttributes) {
            newGame[attribute] = game[attribute]
        }

        const gameReviews = await game.$relatedQuery("reviews")
        newGame.reviews = await ReviewSerializer.showReviewDetails(gameReviews)

        return newGame
    }
}

export default GamesSerializer