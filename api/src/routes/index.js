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
    let pages = [axios(url)]

    for (let i = 1; i < 5; i++) {
        let elemento = axios(url + page + (i + 1))
        pages.push(elemento)
    }

    await Promise.all(pages).then((r) => {

        r.map((r) => {
            let game = r.data.results.map(game => {
                return {
                    id: game.id,
                    name: game.name,
                    release_date: game.released,
                    rating: game.rating,
                    img: game.background_image,
                    genres: game.genres.map(obj => obj.name), // array de generos
                    platform: game.platforms.map(obj => obj.platform.name), // array de plataformas
                }
            })
            juegos.push(game)
        })
    })

    return juegos.flat()
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

const postGameDb = async (name, description, release_date, rating, platform, img, genre) => {

    const game = await Videogame.create({
        name,
        description,
        release_date,
        rating,
        platform,
        img,
    })
    await postGenresInDb()
    genre?.forEach(async (gen) => {
        await game.addGenre(gen)
    })

    return "Game created"
}

const getGenres = async () => {

    const genres = []
    let infoGenres = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    infoGenres.data.results.map(genre => {
        genres.push({ name: genre.name, id: genre.id })
    })
    return genres
}

const postGenresInDb = async () => {

    let apiGenres = await getGenres();
    apiGenres.forEach(genre => {
        Genre.findOrCreate({
            where: { name: genre.name, id: genre.id }
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
        genresToJson.map(gen => generos.push({ name: gen.name, id: gen.id }))
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
                genres: game.genres.map(obj => obj.name), // array de generos
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
            let games = await getAllGames();
            res.json(games)
        } catch (error) {
            next(error)
        }
    }
})

router.get('/videogame/:id', async (req, res, next) => {

    let id = req.params.id
    try {
        if (id.length > 10) {
            let resultado = await Videogame.findByPk(id)
            if (resultado) {
                let genero = await resultado.getGenres()
                let genres = genero.map(gen => gen.name)
                res.json({ ...resultado.dataValues, genres })
            }
        } else {
            let gameInApi = await axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
            let game = {
                id: gameInApi.data.id,
                name: gameInApi.data.name,
                release_date: gameInApi.data.released,
                rating: gameInApi.data.rating,
                img: gameInApi.data.background_image,
                genres: gameInApi.data.genres.map(obj => obj.name), // array de generos
                platform: gameInApi.data.platforms.map(obj => obj.platform.name), // array de plataformas
                description: gameInApi.data.description,
            }
            res.json(game)
        }
    } catch (error) {
        next(error)
    }
})


router.post('/videogame', async (req, res, next) => {
    let datos = req.body
    try {
        let juegoCreado = postGameDb(datos.name, datos.description, datos.release_date,
            datos.rating, datos.platform, datos.img, datos.genre)
        res.json(juegoCreado)
    } catch (error) {
        next(error)
    }
})

router.get('/genres', async (req, res, next) => {
    let generos = await getGenresInDb();

    try {
        res.json(generos)
    } catch (error) {
        next(error)
    }
})


module.exports = router;
