import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getGamesById } from "../Actions/Index";
import React from "react";

export default function Detail() {

    
    const dispatch = useDispatch()
    const videogame = useSelector(state => state.videogames)


    useEffect(() => {
        dispatch(getGamesById()) // FALTA PASAR UN ID
    }, [])

    return (
        <div>
            {
                <>
                    <h1>{videogame.name}</h1>
                </>
            }
        </div>
    )
}