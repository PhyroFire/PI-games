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
            <select onChange={event => handleOrderByRank(event)}>
                <option>Order by Rating</option>
                <option value='Mayor'>Rating +</option>
                <option value='Menor'>Rating -</option>
            </select>
        </div>
    )
}
