import { Game, User } from "../../models/index.js"
import RawgGamesClient from "../../apiClient/RawgGamesClient.js"

class RawgApiGamesSeeder {
    static async seed() {
        const games = await RawgGamesClient.getStrategyGames()

        for (const game of games) {
            const inDB = await Game.query().findOne({ name: game.name })

            if(!inDB) {
                let gameWithoutGameId = {...game}
                delete gameWithoutGameId.gameId
                await Game.query().insertAndFetch(gameWithoutGameId)
            }
        }
    }
}

export default RawgApiGamesSeeder