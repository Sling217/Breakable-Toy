class GamesSerializer {
    static showDetailsForList (gamesArray) {
        const newGames = gamesArray.map((game) => {
            return {
                id: game.id,
                name: game.name,
                genres: game.genres,
                prices: game.prices
            }
        })
        return newGames
    }
}

export default GamesSerializer