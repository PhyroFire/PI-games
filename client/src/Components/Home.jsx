import { getAllVideogames } from "../Actions/Index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";

import Games from './Games.jsx'
import Paginado from "./Paginado.jsx";
import FilterOrigin from "./FilterOrigin";
import FilterRating from "./FilterRating";
import FilterName from "./FilterName";
import FilterGenre from "./FilterGenre";
import SearchBar from "./SearchBar";

import '../CSS/Home.css'
import video from '../CSS/Assassins_Creed_Trailer_Trim.mp4'



export default function Home() {

    const dispatch = useDispatch()
    const allVideogames = useSelector(state => state.videogames)

    const [currentPage, setCurrentPage] = useState(1)
    const gamesXPage = 15
    const indexOfLastGame = currentPage * gamesXPage
    const indexOfFirstGame = indexOfLastGame - gamesXPage
    const currentGames = allVideogames.slice(indexOfFirstGame, indexOfLastGame)

    useEffect(() => {
            dispatch(getAllVideogames())
    }, [dispatch])

    return (
        <div className="Home">
            <div className="TOP">
                <h1>🎮 Henry Game's Proyect 🎮</h1>
                <video autoPlay preload="auto" muted loop src={video}></video>
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
                pages={setCurrentPage}
            />

            <Games currentGames={currentGames} />

        </div>
    )
}