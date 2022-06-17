import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getGamesByName } from "../Actions/Index";


export default function SearchBar() {

    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInput(event) {
        setName(event.target.value)
    }

    function handleSubmit(event) {
        dispatch(getGamesByName(name))
        setName("")
    }

    return (
        <div>
            <input
                value={name}
                type='text'
                placeholder="Search game..."
                onChange={(event) => handleInput(event)}
            />
            <button type="submit" onClick={(event) => handleSubmit(event)}>Search</button>
        </div>
    )

}