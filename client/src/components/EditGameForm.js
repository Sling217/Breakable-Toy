import React, { useEffect, useState } from "react"
import translateServerErrors from "../services/translateServerErrors"
import ErrorList from "./layout/ErrorList"
import { Redirect } from "react-router-dom"

const EditGameForm = (props) => {
    const gameId = props.match.params.id

    const defaultGame = {
        name: "",
        description:"",
        genres: "",
        prices: "",
        platforms: "",
        imageUrl: "",
        stores: ""
    }

    const [editedGame, setEditedGame] = useState(defaultGame)
    const [errors, setErrors] = useState([])
    const [shouldRedirectShow, setShouldRedirectShow] = useState(false)

    const getExistingGameData = async (gameId) => {
        try {
            const response = await fetch(`/api/v1/games/${gameId}`)
            if(!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const body = await response.json()
            setEditedGame(body.game)
        } catch (error) {
            console.error(`Error in fetch: ${error.message}` )
        }
    }

    useEffect(() => {
        getExistingGameData(gameId)
    }, [])


    const patchEditedGame = async () => {
        try {
            const response = await fetch(`/api/v1/games/${gameId}`, {
                method: "PATCH",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify( {game: editedGame} )
            })
            if (!response.ok) {
                if (response.status === 422) {
                    const errorBody = await response.json()
                    const newErrors = translateServerErrors(errorBody.errors)
                    return setErrors(newErrors)
                } else {
                    const errorMessage = await response.json()
                    throw new Error(errorMessage)
                }
            } else {
                setShouldRedirectShow(true)
            }
        } catch(error) {
            console.error("Error in fetch", error.message)
        }
    }

    const handleInputChange = (event) => {
        if (event.currentTarget.type === "text"){
            setEditedGame({
                ...editedGame,
                [event.currentTarget.name]: event.currentTarget.value
            })
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        patchEditedGame()
    }

    if (shouldRedirectShow) {
        return <Redirect push to={`/games/${gameId}`} />
    }

    return (
        <div className="new-game-form">
            <h1 className="new-game-header">Edit A Game</h1>
            <ErrorList errors={errors}/>
            <form onSubmit={handleSubmit}>
                <label className="dark-text bold-text">
                    Name
                    <input
                        className="form-field-input"
                        type="text"
                        name="name"
                        onChange={handleInputChange}
                        value={editedGame.name}
                    />
                </label>
                <label className="dark-text bold-text">
                    Description
                    <input
                        className="form-field-input"
                        type="text"
                        name="description"
                        onChange={handleInputChange}
                        value={editedGame.description}
                    />
                </label>
                <label className="dark-text bold-text">
                    Genres
                    <input
                        className="form-field-input"
                        type="text"
                        name="genres"
                        onChange={handleInputChange}
                        value={editedGame.genres}
                    />
                </label>
                <label className="dark-text bold-text">
                    Prices
                    <input
                        className="form-field-input"
                        type="text"
                        name="prices"
                        onChange={handleInputChange}
                        value={editedGame.prices}
                    />
                </label>
                <label className="dark-text bold-text">
                    Platforms
                    <input
                        className="form-field-input"
                        type="text"
                        name="platforms"
                        onChange={handleInputChange}
                        value={editedGame.platforms}
                    />
                </label>
                <label className="dark-text bold-text">
                    imageUrl
                    <input 
                        className="form-field-input"
                        type="text"
                        name="imageUrl"
                        onChange={handleInputChange}
                        value={editedGame.imageUrl}
                    />
                </label>
                <label className="dark-text bold-text">
                    Stores
                    <input 
                        className="form-field-input"
                        type="text"
                        name="stores"
                        onChange={handleInputChange}
                        value={editedGame.stores}
                    />
                </label>
                <input className="form-button-dark" type="submit" value="submit" />
            </form>
        </div>
    )
}

export default EditGameForm