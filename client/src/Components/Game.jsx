import React from "react";
import { Link } from "react-router-dom";

export default function Game({ name, img, genres, id }) {
    return (
        <div>
            <Link to={'/videogame/'+id}>
                <h1>{name}</h1>
            </Link>
            <img src={img} alt={name} width="500" height="300" />
            {
                genres.map(gen => {
                    return (
                        <div>
                            <p>{gen.name ? gen.name : gen}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}