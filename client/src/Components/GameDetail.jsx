import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getGamesById } from "../Actions/Index";
import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import '../CSS/GameDetail.css'

export default function Detail() {


    const dispatch = useDispatch()
    const videogame = useSelector(state => state.videogame)
    const { id } = useParams() // usar el parametro de la URL

    useEffect(() => {
        dispatch(getGamesById(id))
    }, [])

    return (
        <div className="GameDetail">

            <h1>{videogame.name}</h1>
            <img src={videogame.img} alt={videogame.name} />

            <h3>Game ID in API :</h3>
            <p>{videogame.id}</p>

            <h3>Rating :</h3>
            <p> ★ {videogame.rating}</p>

            <h3>Description :</h3>
            <p>{videogame.description}</p>

            <h3>Release date :</h3>
            <p>{videogame.release_date}</p>

            <h3>Genres :</h3>
            {
                videogame.genres?.map(gen => {
                    return (
                        <div>
                            <p>{gen.name ? gen.name : gen}</p>
                        </div>
                    )
                })
            }

            <h3>Platforms :</h3>
            {
                videogame.platform?.map(plat => {
                    return (
                        <div>
                            <p>{plat}</p>
                        </div>
                    )
                })
            }

            <Link to='/home'><button>Back to Home</button></Link>

        </div>
    )
}