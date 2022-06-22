const axios = require('axios');

export function getAllVideogames() {
    return function (dispatch) {
        fetch('http://localhost:3001/videogames')
            .then(res => res.json())
            .then(resToJson => dispatch({
                type: 'GET_ALL_VIDEOGAMES',
                payload: resToJson
            }))
    }
}

export function getAllGenres() {
    return function (dispatch) {
        fetch('http://localhost:3001/genres')
            .then(res => res.json())
            .then(resToJson => dispatch({
                type: 'GET_ALL_GENRES',
                payload: resToJson
            }))
    }
}

export function getAllPlatforms() {
    return function (dispatch) {
        fetch('http://localhost:3001/platforms')
            .then(res => res.json())
            .then(resToJson => dispatch({
                type: 'GET_ALL_PLATFORMS',
                payload: resToJson
            }))
    }
}

export function getGamesByName(name) {
    return function (dispatch) {
        try {
            fetch(`http://localhost:3001/videogames?name=${name}`)
                .then(res => res.json())
                .then(resToJson => dispatch({
                    type: 'GET_GAME_BY_NAME',
                    payload: resToJson
                }))
        } catch (error) {
            console.log(error)
        }
    }
}

export function getGamesById(id) {
    return function (dispatch) {
        fetch(`http://localhost:3001/videogame/${id}`)
            .then(res => res.json())
            .then(resToJson => dispatch({
                type: 'GET_GAME_BY_ID',
                payload: resToJson
            }))
    }
}

export function getGamesByGenre(genre) {
    return {
        type: 'GET_GAMES_BY_GENRE',
        payload: genre
    }
}

export function filterMyGames(myGame) {
    return {
        type: 'FILTER_MY_GAMES',
        payload: myGame
    }
}

export function orderByName(order) {
    return function (dispatch) {

        fetch(`http://localhost:3001/nameOrder?order=${order}`)
            .then(res => res.json())
            .then(resToJson => dispatch({
                type: 'ORDER_BY_NAME',
                payload: resToJson
            }))
    }
}

export function orderByRank(order) {
    return function (dispatch) {
        fetch(`http://localhost:3001/rankOrder?order=${order}`)
            .then(res => res.json())
            .then(resToJson => dispatch({
                type: 'ORDER_BY_RANK',
                payload: resToJson
            }))
    }
}

export function postGame(payload) {
    return async function () {
        await axios.post(`http://localhost:3001/videogame`, payload)
    }
}

export function deleteGame(id) {
    return async function () {
        await axios.delete(`http://localhost:3001/videogame/${id}`)
    }
}