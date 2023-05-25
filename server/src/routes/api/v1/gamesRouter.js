import express from "express";
import { Game } from "../../../models/index.js";
import GamesSerializer from "../../../db/Serializers/GamesSerializer.js";
import cleanUserInput from "../../../services/cleanUserInput.js";
import { ValidationError } from "objection";

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

gamesRouter.post("/", async (req, res) => {
    try {
        const { body } = req
        const cleanedInput = cleanUserInput(body.game)
        const game = await Game.query().insertAndFetch(cleanedInput)
        res.status(201).json({ game: game })
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(422).json({ errors: error.data })
        } else {
            res.status(500).json({ errors: error.message })
        }
    }
})

export default gamesRouter