import React from "react"
import Game from "../Components/Game.jsx"

import Loading from '../CSS/Loading.gif'
import notFound from '../CSS/notFound.jpg'

import { useDispatch } from "react-redux";
import { getAllVideogames } from "../Actions/Index";

export default function Games({ currentGames }) {

    const dispatch = useDispatch()

    function handleButton(event) {
        event.preventDefault()
        dispatch(getAllVideogames())
    }

    return (
        <div className="Cards">
            {
                currentGames.length > 0 ?

                    typeof currentGames === "object" ?

                        currentGames.map(game => {
                            return (
                                <div key={game.id}>
                                    <Game name={game.name} img={game.img} genres={game.genres} rating={game.rating} id={game.id} />
                                </div>
                            )
                        })
                        :
                        <button onClick={event => handleButton(event)}>
                            <h1>Not found</h1>
                            <img id="notFound" src={notFound} alt="Not Found" />
                        </button>
                    :
                    <div>
                        <h2>Loading...</h2>
                        <img src={Loading} alt="Cargando" />
                    </div>
            }
        </div>
    )
}