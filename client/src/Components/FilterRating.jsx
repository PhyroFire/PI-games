import React from "react";
import { useDispatch } from "react-redux";
import { orderByRank } from "../Actions/Index";

export default function FilterRating() {

    const dispatch = useDispatch()
    function handleOrderByRank(event) {
        dispatch(orderByRank(event.target.value))
    }

    return (
        <div>
            <label>Ordenar por rating</label>
            <select onChange={event => handleOrderByRank(event)}>
                <option>-------</option>
                <option value='Mayor'>Mayor rating</option>
                <option value='Menor'>Menor rating</option>
            </select>
        </div>
    )
}
