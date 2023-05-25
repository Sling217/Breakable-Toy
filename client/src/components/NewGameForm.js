import React, { useState } from "react";
import translateServerErrors from "../services/translateServerErrors";
import ErrorList from "./layout/ErrorList";
import { Redirect } from "react-router-dom";

const NewGameForm = (props) => {

    const defaultGame = {
        name: "",
        description:"",
        genres: "",
        prices: "",
        platforms: ""
    }

    const [newGame, setNewGame] = useState(defaultGame)
    const [errors, setErrors] = useState([])
    const [shouldRedirect, setShouldRedirect] = useState(false)

    const postNewGame = async () => {
        try {
            const response = await fetch("/api/v1/games", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify( {game: newGame} )
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
                setShouldRedirect(true)
            }
        } catch (error) {
            console.error("Error in fetch", error.message)
        }
    }

    const handleInputChange = (event) => {
        if(event.currentTarget.type === "text"){
            setNewGame({
                ...newGame,
                [event.currentTarget.name]: event.currentTarget.value
            })
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        postNewGame()
    }

    if(shouldRedirect) {
        return <Redirect push to="/games" />
    }

    return (
        <div className="new-game-form">
            <h1 className="new-game-header">Add a New Game</h1>
            <ErrorList errors={errors}/>
            <form onSubmit={handleSubmit}>
                <label className="dark-text bold-text">
                    Name
                    <input
                        className="form-field-input"
                        type="text"
                        name="name"
                        onChange={handleInputChange}
                        value={newGame.name}
                    />
                </label>
                <label className="dark-text bold-text">
                    Description
                    <input
                        className="form-field-input"
                        type="text"
                        name="description"
                        onChange={handleInputChange}
                        value={newGame.description}
                    />
                </label>
                <label className="dark-text bold-text">
                    Genres
                    <input
                        className="form-field-input"
                        type="text"
                        name="genres"
                        onChange={handleInputChange}
                        value={newGame.genres}
                    />
                </label>
                <label className="dark-text bold-text">
                    Prices
                    <input
                        className="form-field-input"
                        type="text"
                        name="prices"
                        onChange={handleInputChange}
                        value={newGame.prices}
                    />
                </label>
                <label className="dark-text bold-text">
                    Platforms
                    <input
                        className="form-field-input"
                        type="text"
                        name="platforms"
                        onChange={handleInputChange}
                        value={newGame.platforms}
                    />
                </label>
                <input className="form-button-dark" type="submit" value="submit" />
            </form>
        </div>
    )
}

export default NewGameForm