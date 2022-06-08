import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllGenres, getAllPlatforms, postGame } from "../Actions/Index";


export default function CreateGame() {

    const dispatch = useDispatch()
    const allGenres = useSelector(state => state.genres)
    const allPlatforms = useSelector(state => state.platforms)

    const [input, setImput] = useState({
        name: "",
        description: "",
        release_date: "",
        rating: 0,
        platform: [],
        genre: [],
        img: "",
    })

    useEffect(() => {
        dispatch(getAllGenres())
        dispatch(getAllPlatforms())
    }, [])

    function handleInput(event) {
        event.preventDefault()
        setImput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    function handleSelectGenre(event) {
        event.preventDefault()
        setImput({
            ...input,
            genre: [...input.genre, event.target.value]
        })
    }

    function handleSelectPlatform(event) {
        event.preventDefault()
        setImput({
            ...input,
            platform: [...input.platform, event.target.value]
        })
    }

    function handleRemoveGenre(event) {
        event.preventDefault()
        let arrayFiltrado = input.genre.filter(genre => genre != event.target.value)
        setImput({
            ...input,
            genre: arrayFiltrado
        })
    }

    function handleRemovePlatform(event) {
        event.preventDefault()
        let arrayFiltrado = input.platform.filter(plat => plat != event.target.value)
        setImput({
            ...input,
            platform: arrayFiltrado
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log(input)
        dispatch(postGame(input))
        alert("Game created!")
        setImput({
            name: "",
            description: "",
            release_date: "",
            rating: 0,
            platform: [],
            genre: [],
            img: "",
        })
    }

    return (
        <div>
            <Link to='/home'><button>Volver al Home!</button></Link>
            <h1>Create your own game !</h1>
            <form onSubmit={(event) => handleSubmit(event)}>
                <div>
                    <label>Name</label>
                    <input
                        type='text'
                        value={input.name}
                        name='name'
                        onChange={(event) => handleInput(event)}
                    />
                </div>
                <div>
                    <label>Description</label>
                    <input
                        type='text'
                        value={input.description}
                        name='description'
                        onChange={(event) => handleInput(event)}
                    />
                </div>
                <div>
                    <label>Release Date</label>
                    <input
                        type='date'
                        value={input.release_date}
                        name='release_date'
                        onChange={(event) => handleInput(event)}
                    />
                </div>
                <div>
                    <label>Rating</label>
                    <input
                        type='number'
                        value={input.rating}
                        name='rating'
                        min="1" max="5"
                        onChange={(event) => handleInput(event)}
                    />
                </div>
                <div>
                    <label>Image</label>
                    <input
                        type='text'
                        value={input.img}
                        name='img'
                        onChange={(event) => handleInput(event)}
                    />
                </div>
                <select onChange={(event) => handleSelectGenre(event)}>
                    <option>-------</option>
                    {
                        allGenres && allGenres.map(gen => {
                            return (
                                <option value={gen.name}>{gen.name}</option>
                            )
                        })
                    }
                </select>
                <ul>{input.genre.map(gen => { return (<li>{gen}<button value={gen} onClick={(event) => handleRemoveGenre(event)}>X</button></li>) })}</ul>

                <select onChange={(event) => handleSelectPlatform(event)}>
                    <option>-------</option>
                    {
                        allPlatforms && allPlatforms.map(plat => {
                            return (
                                <option value={plat}>{plat}</option>
                            )
                        })
                    }
                </select>
                <ul>{input.platform.map(plat => { return (<li>{plat}<button value={plat} onClick={(event) => handleRemovePlatform(event)}>X</button></li>) })}</ul>

                <button type="submit">Create Game</button>
            </form>
        </div>
    )
}