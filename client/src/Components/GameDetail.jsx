import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteGame, getGamesById } from "../Actions/Index";
import React from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import '../CSS/GameDetail.css'

export default function Detail() {


    const dispatch = useDispatch()
    const navigate = useNavigate();
    const videogame = useSelector(state => state.videogame)
    const { id } = useParams() // usar el parametro de la URL

    useEffect(() => {
        dispatch(getGamesById(id))
    }, [])

    function handleDelete(event){
        event.preventDefault()
        dispatch(deleteGame(videogame.id))
        // confirm("Game deleted") VER IMPLEMENTACION
        navigate("/home");
    }

    return (
        <div className="GameDetail">

            <h1>{videogame.name}</h1>
            <img src={videogame.img} alt={videogame.name} />

            <h3>Game ID in API :</h3>
            <p>{videogame.id}</p>

            <h3>Rating :</h3>
            <p> ★ {videogame.rating}</p>

            <h3>Description :</h3>
            <div id="description">
                {typeof videogame.id === "number" ? <p dangerouslySetInnerHTML={{ __html: videogame.description }} /> :
                    <p>{videogame.description}</p>}
            </div>
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

            {
                videogame.myGame &&
                <div id="deleteGame">
                    <button onClick={(event)=>handleDelete(event)}>Delete Game</button>
                </div>
            }

            <Link to='/home'><button id="backToHome">Back to Home</button></Link>

        </div>
    )
}