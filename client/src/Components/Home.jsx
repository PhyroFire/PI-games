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
import '../CSS/Home.css'
import Loading from '../CSS/Loading.gif'
import video from '../CSS/Assassins_Creed_Trailer_Trim.mp4'

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


    return (
        <div className="Home">
            <div className="TOP">
                <video autoPlay preload="auto" muted loop src={video}></video>

                <h1>🎮 Henry Game's Proyect 🎮</h1>

            </div>
            <div className="MainNav">

                <SearchBar />

                <Link to={'/createGame'}><button>CREATE GAME!</button></Link>

                <Link to={'/about'}><button>ABOUT THIS PAGE</button></Link>

                <Link to='/'><button>Back to start</button></Link>

            </div>

            <nav className="Nav_Home">
                <FilterGenre />

                <FilterOrigin />

                <FilterRating />

                <FilterName />
            </nav>


            <Paginado
                gamesXPage={gamesXPage}
                allgames={allVideogames.length}
                pages={pages}
            />

            <div className="Cards">
                {
                    currentGames.length ?
                        currentGames.map(game => {
                            return (
                                <div>
                                    <Game name={game.name} img={game.img} genres={game.genres} rating={game.rating} id={game.id} />
                                </div>
                            )
                        })
                        :
                        <div>
                            <h2>Loading...</h2>
                            <img src={Loading} alt="Cargando" />
                        </div>

                }
            </div>

            <Paginado
                gamesXPage={gamesXPage}
                allgames={allVideogames.length}
                pages={pages}
            />
        </div>
    )
}