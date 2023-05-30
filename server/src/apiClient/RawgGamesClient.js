import got from "got";
import config from "../config.js";

class RawgGamesClient {

    static async getDescription(gameId) {
        try {
            const url = `https://api.rawg.io/api/games/${gameId}?key=${config.rawgKey}`
            const apiResponse = await got(url)
            const responseBody = await JSON.parse(apiResponse.body)
            const returnedDescription = responseBody.description_raw
            return returnedDescription
        } catch (error) {
            return { errors: error.message }
        }
    }

    static async getGenres() {
        try {
            const url = `https://api.rawg.io/api/genres?key=${config.rawgKey}`
            const apiResponse = await got(url)
            const responseBody = await JSON.parse(apiResponse.body)
            let returnedGenre = {}
            responseBody.results.forEach((genre) => {
                if (genre.name !== null && genre.name === "Strategy") {
                    returnedGenre = {
                        name: genre.name
                    }
                }
            })
            return returnedGenre.name
        } catch (error) {
            return { errors: error.message }
        }
    }
    
    static async getPlatforms(gameId) {
        try {
            const url = `https://api.rawg.io/api/games/${gameId}?key=${config.rawgKey}`
            const apiResponse = await got(url)
            const responseBody = await JSON.parse(apiResponse.body)
            // we might iterate over responseBody.platforms
            const returnedPlatform0 = responseBody.platforms[0]
            const platform0 = returnedPlatform0.platform
            const finalPlatform0 = platform0.name
            const returnedPlatform1 = responseBody.platforms[1]
            const platform1 = returnedPlatform1.platform
            const finalPlatform1 = platform1.name
            const returnedPlatform2 = responseBody.platforms[2]
            const platform2 = returnedPlatform2?.platform
            const finalPlatform2 = platform2?.name
            let platformString = "No Platform"
            if (!finalPlatform0 && !finalPlatform1 && !finalPlatform2) {
                return platformString
            } else {
                return finalPlatform0 || finalPlatform1 || finalPlatform2
            }
        } catch (error) {
            console.log(error)
            return { errors: error.message }
        }
    }

    static async getStores(gameId) {
        try{
            const url = `https://api.rawg.io/api/games/${gameId}?key=${config.rawgKey}`
            const apiResponse = await got(url)
            const responseBody = JSON.parse(apiResponse.body)
            let returnStores = {}
            responseBody.stores.forEach((store) => {
                return returnStores ={
                    stores: store.store.name
                }
            })
            return returnStores.stores
        } catch (error) {
            return { errors: error.message }
        }
    }

    static async getStrategyGames() {
        try {
             const url = `https://api.rawg.io/api/games?key=${config.rawgKey}&genres=strategy`
            const apiResponse = await got(url)
            const responseBody = JSON.parse(apiResponse.body)
            const returnedGames = await Promise.all(responseBody.results.map(async (game) => {
                const description = await this.getDescription(game.id)
                const genres = await this.getGenres()
                const platforms = await this.getPlatforms(game.id)
                const stores = await this.getStores(game.id)
                return {
                    name: game.name,
                    description: description,
                    genres: genres,
                    platforms: platforms,
                    imageUrl: game.background_image,
                    stores: stores,
                    gameId: game.id
                }
            }))
            return returnedGames
        } catch (error) {
            return { errors: error.message }
        }
    }
}

export default RawgGamesClient