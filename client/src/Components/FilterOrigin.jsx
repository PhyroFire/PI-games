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
            <select onChange={event => handleMyGames(event)}>
                <option>Origin</option>
                <option value='All'>All games</option>
                <option value='My Games'>Created games</option>
                <option value='Api'>API's RAWG games</option>
            </select>
        </div>
    )
}