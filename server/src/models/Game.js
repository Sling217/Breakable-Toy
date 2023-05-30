const Model = require("./Model.js")

class Game extends Model {
    static get tableName() {
        return ("games")
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name", "description", "genres", "platforms"],
            properties: {
                name: { type: "string" },
                description: { type: "string", minLength: 15 },
                genres: { type: "string" },
                prices: { type: ["integer", "string"] },
                platforms: { type: "string" },
                imageUrl: { type: "string" },
                stores: { type: "string" }
            }
        }
    }

    static get relationMappings() {
        const { Review, User } = require("./index.js")
        return {
            reviews: {
                relation: Model.HasManyRelation,
                modelClass: Review,
                join: {
                    from: "games.id",
                    to: "reviews.gameId"
                }
            },

            users: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: "games.id",
                    through: {
                        from: "userGames.gameId",
                        to: "userGames.userId"
                    },
                    to: "users.id"
                }
            }
        }

    }
}

module.exports = Game