const initialState = {
    videogames: [],
    genres: [],
    allVideogames: []
}

export default function rootReducer(state = initialState, action) {

    const allGames = state.allVideogames

    switch (action.type) {
        case 'GET_ALL_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload,
            }
        case 'GET_ALL_GENRES':
            return {
                ...state,
                genres: action.payload
            }
        case 'GET_GAME_BY_NAME':
            return {
                ...state,
                videogames: action.payload
            }
        case 'GET_GAME_BY_ID':
            return {
                ...state,
                videogames: action.payload
            }
        case 'GET_GAMES_BY_GENRE':
            const gamesGenre = action.payload === 'All' ? allGames : allGames.filter(game => game.genres.find(genre => genre === action.payload || genre.name === action.payload))
            return {
                ...state,
                videogames: gamesGenre
            }
        case 'FILTER_MY_GAMES':
            const myGames = action.payload === 'My Games' ? allGames.filter(game => game.myGame) : allGames.filter(game => !game.myGame)
            return {
                ...state,
                videogames: action.payload === 'All' ? state.allVideogames : myGames
            }
        case 'ORDER_BY_NAME':
            return {
                ...state,
                videogames: action.payload
            }
        case 'ORDER_BY_RANK':
            return {
                ...state,
                videogames: action.payload
            }
        default: return state
    }
}