import { Game } from "../../models/index.js";

class GamesSeeder {
    static async seed() {
        const games = [
            {
                name: "Crusaders Kings II",
                description: "Crusaders King II is a grand strategy role-playing game set in the Middle Ages developed by Paradox Development Studio and published by Paradox Interactive.",
                genres: "Grand Strategy",
                prices: "0",
                platforms: "Microsoft windows, OS X, Linux"
            },

            {
                name: "Crusaders Kings III",
                description: "Crusaders Kings III is is a grand strategy role-playing game set in the Middle Ages developed by Paradox Development Studio and published by Paradox Interactive.",
                genres: "Grand Strategy",
                prices: "25",
                platforms: "Microsoft windows, OS X, Linux, Play Station 5, Xbox series X & S"
            },
            {
                name: "Civilization VI",
                description: "Sid Meier's Civilization VI is a turn based strategy 4X video game developed by Firaxis Games, published by 2K, and distributed by Take-Two Interactive.",
                genres: "Grand Strategy",
                prices: "30",
                platforms: "Steam, Xbox One, Play Station 4, Nintendo Switch"
            }
        ]

        for (const game of games) {
            const inDB = await Game.query().findOne({ name: game.name })
            if(!inDB) {
                await Game.query().insert(game)
            }
        }
    }
}

export default GamesSeeder