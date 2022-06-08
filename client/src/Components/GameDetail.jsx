import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getGamesById } from "../Actions/Index";
import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


export default function Detail() {


    const dispatch = useDispatch()
    const videogame = useSelector(state => state.videogame)
    const { id } = useParams() // usar el parametro de la URL

    useEffect(() => {
        dispatch(getGamesById(id))
    }, [])

    return (
        <div>

            <h1>{videogame.name}</h1>
            <img src={videogame.img} alt={videogame.name} width="1000" height="600" />

            <h3>Game ID in API :</h3>
            <p>{videogame.id}</p>

            <h3>Rating :</h3>
            <p>{videogame.rating}</p>

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

            <Link to='/home'><button>HOME</button></Link>

        </div>
    )
}