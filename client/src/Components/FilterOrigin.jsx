import React from "react";
import { useDispatch } from "react-redux";
import { filterMyGames } from "../Actions/Index";

export default function FilterOrigin() {
    
    const dispatch = useDispatch()
    function handleMyGames(event) {
        dispatch(filterMyGames(event.target.value))
    }

    return (
        <div>
            <label>Ordenar por origen</label>
            <select onChange={event => handleMyGames(event)}>
                <option>-------</option>
                <option value='All'>Todos los juegos</option>
                <option value='My Games'>Juegos creados</option>
                <option value='Api'>Juegos en API</option>
            </select>
        </div>
    )
}