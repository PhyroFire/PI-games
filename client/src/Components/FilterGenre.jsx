import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getGamesByGenre, getAllGenres } from "../Actions/Index";

export default function FilterGenre() {

    const dispatch = useDispatch()
    const allGenres = useSelector(state => state.genres)

    useEffect(() => {
        dispatch(getAllGenres())
    }, [])

    function handleGenreFilter(event) {
        dispatch(getGamesByGenre(event.target.value))
    }

    return (
        <div>
            <select onChange={event => handleGenreFilter(event)}>
                <option>Order by Genre</option>
                <option value='All'>All</option>
                {
                    allGenres && allGenres.map(gen => {
                        return (
                            <option value={gen.name}>{gen.name}</option>
                        )
                    })
                }
            </select>
        </div>
    )

}