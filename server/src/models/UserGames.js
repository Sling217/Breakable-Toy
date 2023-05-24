const Model = require("./Model.js")

class UserGames extends Model {
    static get tableName() {
        return "userGames"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["userId", "gameId"],
            properties: {
                userId: { type: ["integer", "string"] },
                gameId: { type: ["integer", "string"] }
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
                    from: "userGames.gameId",
                    to: "games.id"
                }
            },

            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "userGames.userId",
                    to: "users.id"
                }
            }
        }
    }
}

module.exports = UserGames