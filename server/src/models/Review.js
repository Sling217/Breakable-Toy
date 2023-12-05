const Model = require("./Model.js")

class Review extends Model {
    static get tableName() {
        return ("reviews")
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["reviewText", "rating", "userId", "gameId"],
            properties: {
                reviewText: { type: "string", minLength: 15 },
                rating: { type: ["integer", "string"] },
                userId: { type: ["integer", "string"] },
                gameId: { type: ["integer", "string"] },
                imageUrl: { type: "string" }
            }
        }
    }

    static get relationMappings() {
        const { Game, User } = require("./index.js")
        return {
            game: {
                relation: Model.BelongsToOneRelation,
                modelClass: Game,
                join: {
                    from: "reviews.gameId",
                    to: "games.id"
                }
            },

            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "reviews.userId",
                    to: "users.id"
                }
            }
        }
    }
}

module.exports = Review