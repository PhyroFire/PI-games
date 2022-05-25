require('dotenv').config();
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { API_KEY } = process.env;
const axios = require('axios');
const { Videogame, Genre } = require('../db');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



const getApiGames = async () => {
    // Devuelve los 100 primeros juegos de la API
    let url = `https://api.rawg.io/api/games?key=${API_KEY}`
    let page = `&page=`
    const juegos = []

    for (let i = 0; i < 5; i++) {

        let gamesUrl = await axios(url)
        let mapeo = await gamesUrl.data.results.map(game => {
            return {
                id: game.id,
                name: game.name,
                release_date: game.released,
                rating: game.rating,
                img: game.background_image,
                genre: game.genres.map(obj => obj.name), // array de generos
                platform: game.platforms.map(obj => obj.platform.name), // array de plataformas
            }
        })
        juegos.push(mapeo)
        url = url + page + `${i + 2}`
    }
    return juegos.flat() // [100 juegos]
}

const getDbGames = async (params) => {
    // Espera un parametro name y devuelve coincidencias, si no lo recibe devuelve todos los juegos
    if (params) {

        let where = {}
        let condition = {
            include: {
                model: Genre,
                attributes: ['name'],
                through: { attributes: [] }
            }
        }

        if (params) where.name = params

        condition.where = where

        return await Videogame.findAll(condition)

    } else {
        return await Videogame.findAll({
            include: {
                model: Genre,
                attributes: ['name'],
                through: { attributes: [] }
            }
        })
    }
}

const getAllGames = async () => {

    let gamesApi = await getApiGames()
    let gamesDb = await getDbGames()

    return gamesDb.concat(gamesApi)
}

const postGameDb = async (name, description, release_date, rating, platform, img) => {

    const game = await Videogame.create({
        name,
        description,
        release_date,
        rating,
        platform,
        img,
    })
    return "Game created"
}

const getGenres = async () => {

    const genres = []
    let infoGenres = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    infoGenres.data.results.map(genre => {
        genres.push(genre.name)
    })
    return genres
}

const postGenresInDb = async () => {

    let apiGenres = await getGenres();
    apiGenres.forEach(genre => {
        const generoNuevo = Genre.create({
            name: genre
        })
    })
    return apiGenres
}

const getGenresInDb = async () => {

    let generos = []
    let genresInDB = await Genre.findOne({
        where: { name: 'Action' }
    })

    if (genresInDB) {
        let genres = await Genre.findAll()
        let genresToJson = genres.map(gen => gen.toJSON())
        genresToJson.map(gen => generos.push(gen.name))
        return generos
    } else {
        generos = postGenresInDb()
        return generos
    }

}

router.get('/videogames', async (req, res, next) => {

    let name = req.query.name
    if (name) {

        let info = await axios(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
        let gamesApi = info.data.results.map(game => {
            return {
                id: game.id,
                name: game.name,
                release_date: game.released,
                rating: game.rating,
                img: game.background_image,
                genre: game.genres.map(obj => obj.name), // array de generos
                platform: game.platforms.map(obj => obj.platform.name), // array de plataformas
            }
        })

        let gamesDb = await getDbGames(name);
        let allFilterGames = gamesDb.concat(gamesApi);

        try {
            res.json(allFilterGames)
        } catch (error) {
            next(error)
        }

    } else {

        try {
            let games = await getAllGames() // MEJORAR PARA QUE SOLO UNA VEZ LLAME A LA API
            res.json(games)
        } catch (error) {
            next(error)
        }
    }
})

router.get('/videogame/:id', async (req, res, next) => {
    // Trae solo los juegos de la API
    let id = req.params.id
    try {
        let gameInApi = await axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        res.json(gameInApi.data)
    } catch (error) {
        next(error)
    }
})


router.post('/videogame', async (req, res, next) => {
    let datos = req.body
    try {
        let juegoCreado = postGameDb(datos.name, datos.description, datos.release_date, datos.rating, datos.platform, datos.img)
        res.json(juegoCreado)
    } catch (error) {
        next(error)
    }
})

router.get('/genres', async (req, res, next) => {
    let generos = await getGenresInDb();
    console.log(generos)
    try {
        res.json(generos)
    } catch (error) {
        next(error)
    }

})


module.exports = router;
