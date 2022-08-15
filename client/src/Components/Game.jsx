import React from "react";
import { Link } from "react-router-dom";
import '../CSS/Game.css'

export default function Game({ name, img, genres, id, rating }) {
    return (
        <div className="card">
            <Link to={'/videogame/' + id}>
                <h3>{name}</h3>
                <img src={img} alt={name} width="300" height="150" />
                <div className="genres">
                    {
                        genres.map(gen => {
                            return (
                                <div key={gen}>
                                    <p>{gen.name ? gen.name : gen}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <p id="rating">  ★ {rating} </p>
            </Link>
        </div>
    )
}