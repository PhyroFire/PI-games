import React from "react";
import { useDispatch } from "react-redux";
import { orderByName } from "../Actions/Index";

export default function FilterName() {

    const dispatch = useDispatch()
    function handleOrderByName(event) {
        dispatch(orderByName(event.target.value))
    }

    return (
        <div>
            <select onChange={event => handleOrderByName(event)}>
                <option>Order by ABC</option>
                <option value='Ascendente'>A - Z</option>
                <option value='Descendente'>Z - A</option>
            </select>
        </div>
    )

}