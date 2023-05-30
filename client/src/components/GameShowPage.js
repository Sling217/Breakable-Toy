import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import { format } from "date-fns"
import NewGameReviewForm from "./NewGameReviewForm"
import ReviewTile from "./ReviewTile"

const GameShowPage = (props) => {
    const [game, setGame] = useState({
        name:"",
        description:"",
        platforms: "",
        updatedAt: "",
        imageUrl:"",
        stores: "",
        reviews: [],

    })
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const [shouldRedirectEdit, setShouldRedirectEdit] = useState(false)
    
    const gameId = props.match.params.id 

    let isAdmin = false
    let classHideSignedOutUser = "hide"
    if (props.user) {
        isAdmin = props.user.isAdmin
        classHideSignedOutUser = ""
    }

    const getGame = async() => {
        try {
            const response = await fetch(`/api/v1/games/${gameId}`)
            if(!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const body = await response.json()
            setGame(body.game)
        } catch (error) {
            console.error(`Error in fetch: ${error.message}` )
        }
    }

    const deleteReview = async (reviewId) => {
        try {
            const response = await fetch(`/api/v1/reviews/${reviewId}`, { method: "DELETE"})
            if(!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const newReviews = game.reviews.filter(review => {
                return (review.id !== reviewId)
            })
            setGame({...game, reviews: newReviews })
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    const handleOnClickDeleteReview = (event, reviewId) => {
        event.preventDefault()
        deleteReview(reviewId)
    }

    const reviewsListOrganic = game.reviews.map(review => {
        const currentUser = props.user
            return (
                <ReviewTile key={review.id} {...review} currentUser={currentUser} isAdmin={isAdmin} handleOnClickDeleteReview={handleOnClickDeleteReview}/>
            )
        }
    )

    useEffect(() => {
        getGame()
    }, [])

    const deleteGame = async () => {
        try {
            const response = await fetch(`/api/v1/games/${gameId}`, { method: "DELETE"})
            if(!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            setShouldRedirect(true)
        } catch (err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }

    const handleOnClickDeleteGame = (event) => {
        event.preventDefault()
        deleteGame()
    }

    const handleOnClickEditGame = (event) => {
        event.preventDefault()
        setShouldRedirectEdit(true)
    }

    if (shouldRedirect) {
        return <Redirect push to="/games" />
    } 
    if (shouldRedirectEdit) {
        return <Redirect push to={`/games/${gameId}/edit`}   />
    }

    let classHideNotAdmin = "hide"
    if (isAdmin) {
        classHideNotAdmin = ""
    }

    const deleteMessage= "Delete Game"
    const editMessage = "Edit Game"

    return (
        <div className="game-show-page">
            <div className="grid-y align-left">
                <div className="games-information-section">
                    <h1 className="game-show-header"> {game.name}</h1>
                    <img src={game.imageUrl} />
                    <p className="game-description"> {game.description}</p>
                    <p className="address-bold"> Platforms: {game.platforms}</p>
                    <p className="address-bold">Stores: {game.stores}</p>
                    <div className="row grid-x">
                        <button onClick={handleOnClickEditGame} className={`override-button-color right-side ${classHideNotAdmin}`}>{isAdmin && editMessage}</button>
                        <button onClick={handleOnClickDeleteGame} className={`delete-button-dark ${classHideNotAdmin}`}>{isAdmin && deleteMessage}</button>
                    </div>
                </div>
                <div className={classHideSignedOutUser}>
                    <NewGameReviewForm gameId={gameId} game={game} setGame={setGame} />
                </div>
                <div className="show-page-reviews">
                    <div className="row grid-x">
                        <div>
                            <h3 className="review-list-header">Review List</h3>
                            {reviewsListOrganic}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default GameShowPage