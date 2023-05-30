import express from "express";
import { Game } from "../../../models/index.js";
import GamesSerializer from "../../../db/Serializers/GamesSerializer.js";
import cleanUserInput from "../../../services/cleanUserInput.js";
import { ValidationError } from "objection";
import gamesReviewsRouter from "./gamesReviewsRouter.js";
import RawgGamesClient from "../../../apiClient/RawgGamesClient.js";

const gamesRouter = new express.Router()
gamesRouter.use("/:id/reviews", gamesReviewsRouter)

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

gamesRouter.get("/:id/edit", async (req, res) => {
    const { id } = req.params
    try {
        const game = await Game.query().findById(id)
        const serializedGame = await GamesSerializer.detailsForEdit(game)
        return res.status(200).json({ game: serializedGame })
    } catch (error) {
        return res.status(500).json({ errors: error.message })
    }
})

gamesRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const game = await Game.query().findById(id)
        const serializedGame = await GamesSerializer.detailsForShow(game)
        return res.status(200).json({ game: serializedGame })
    } catch (error) {
        res.status(500).json({ errors: error.message })
    }
})

gamesRouter.delete("/:id", async (req, res) => {
    const { id } = req.params
    
    try {
        await Game.query().deleteById(id)
        return res.status(200).json({ message: "Dog park successfully deleted" })
    } catch (err) {
        return res.status(500).json({ errors: err.message })
    }
})

gamesRouter.patch("/:id", async (req, res) => {
    const { id } = req.params

    try {
        const { body } = req
        const cleanedInput = cleanUserInput(body.game)
        await Game.query().patchAndFetchById(id, cleanedInput)
        return res.status(200).json({ message: "Dog park successfully edited" })
    } catch(error) {
        if (error instanceof ValidationError) {
            res.status(422).json({ errors: error.data })
        } else {
            res.status(500).json({ errors: error.message })
        }
    }
})
export default gamesRouter