import express from "express";
import { Game } from "../../../models/index.js";
import GamesSerializer from "../../../db/Serializers/GamesSerializer.js";

const gamesRouter = new express.Router()

gamesRouter.get("/", async (req, res) => {
    try {
        const games = await Game.query()
        const serializedGames = GamesSerializer.showDetailsForList(games)
        res.status(200).json({ games: serializedGames })
    } catch (error) {
        res.status(500).json({ errors: error.message })
    }
})

export default gamesRouter