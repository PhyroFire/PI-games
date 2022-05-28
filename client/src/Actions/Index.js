export function getAllVideogames(){
    return function (dispatch){
        fetch('http://localhost:3001/videogames')
        .then(res => res.json())
        .then(resToJson => dispatch ({
            type: 'GET_ALL_VIDEOGAMES',
            payload: resToJson
        }))
    }
}

export function getAllGenres(){
    return function (dispatch){
        fetch('http://localhost:3001/genres')
        .then(res => res.json())
        .then(resToJson => dispatch ({
            type: 'GET_ALL_GENRES',
            payload: resToJson
        }))
    }
}