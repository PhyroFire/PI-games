import { getAllVideogames } from "../Actions/Index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Game from './Game.jsx'
import Paginado from "./Paginado.jsx";
import React from "react";
import FilterOrigin from "./FilterOrigin";
import FilterRating from "./FilterRating";
import FilterName from "./FilterName";
import FilterGenre from "./FilterGenre";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

export default function Home() {

    const dispatch = useDispatch()
    const allVideogames = useSelector(state => state.videogames)

    const [currentPage, setCurrentPage] = useState(1)
    const gamesXPage = 15
    const indexOfLastGame = currentPage * gamesXPage
    const indexOfFirstGame = indexOfLastGame - gamesXPage
    const currentGames = allVideogames.slice(indexOfFirstGame, indexOfLastGame)


    let pages = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getAllVideogames())
    }, [])

    // por que no me deja escribir JS normal ?
    return (
        <div>
            <h1>Sergio Romero Game's Api 🔥</h1>

            <FilterGenre />

            <FilterOrigin />

            <FilterRating />

            <FilterName />

            <SearchBar />

            <Link to={'/createGame'}><button>CREATE GAME!</button></Link>

            <Link to={'/about'}><button>ABOUT THIS PAGE</button></Link>

            <Link to='/'><button>Volver al inicio</button></Link>

            <Paginado
                gamesXPage={gamesXPage}
                allgames={allVideogames.length}
                pages={pages}
            />

            {
                currentGames.length ?
                    currentGames.map(game => {
                        return (
                            <div>
                                <Game name={game.name} img={game.img} genres={game.genres} id={game.id} />
                            </div>
                        )
                    })
                    :
                    <div>
                        <h1>CARGANDO</h1>
                        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/b6e0b072897469.5bf6e79950d23.gif" alt="Cargando" width="400" height="200" />
                    </div>
            }

            <Paginado
                gamesXPage={gamesXPage}
                allgames={allVideogames.length}
                pages={pages}
            />

            <Link to='/'><button>Volver al inicio</button></Link>
        </div>
    )
}