import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"

const GamesList = (props) => {
    const [ games, setGames ] = useState([])
    
    const getGames = async () => {
        try{
            const response = await fetch("/api/v1/games")
            const responseBody = await response.json()
            if (!response.ok) {
                throw new Error(`${response.status} (${response.statusText})`)
            }
            setGames(responseBody.games)
        } catch (error) {
            console.error("Error in fetch", error.message)
        }
    }

    useEffect(() => {
        getGames()
    }, [])

    const gamesList = games.map((game) => {
        return (
            <div className="callout games-list-item left-margin right-margin">
                <Link className="list-link" to={`/games/${game.id}`}> Name: {`${game.name}`}<br></br> </Link>
                Genres: {game.genres}<br></br>
                Price: {game.prices}<br></br>
            </div>
        )
    })

    return (
        <div>
            <div className="games-index">
                <h3 className="center-text form-header-text">Strategy Games</h3>
                <div className="grid-x">
                    <div className="games-list cell small-6">
                    {gamesList.slice(0, Math.ceil(gamesList.length/2))}
                    </div>
                    <div className="games-list cell small-6">
                    {gamesList.slice(Math.ceil(gamesList.length/2))}
                    </div>
                </div>
                <div className="center-text">
                <Link className="add-park-link" to="/games/new">Add a new Game</Link>
                </div>
            </div>
        </div>
    )
}

export default GamesList