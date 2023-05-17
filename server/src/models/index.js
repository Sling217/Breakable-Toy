// include all of your models here using CommonJS requires
const User = require("./User.js")
const Game = require("./Game.js")
const Review = require("./Review.js")
const Model = require("./Model.js")
const UserGames = require("./UserGames.js")

module.exports = { Model, User, Game, Review, UserGames };
