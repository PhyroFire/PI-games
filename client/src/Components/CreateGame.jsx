import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllGenres, getAllPlatforms, postGame } from "../Actions/Index";
import '../CSS/CreateGame.css'
import noImage from '../CSS/NoImage.png'

export default function CreateGame() {

    const dispatch = useDispatch()
    const allGenres = useSelector(state => state.genres)
    const allPlatforms = useSelector(state => state.platforms)
    const navigate = useNavigate();

    const [input, setImput] = useState({
        name: "",
        description: "",
        release_date: "",
        rating: 0,
        platform: [],
        genre: [],
        img: noImage,
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
        if (event.target.value !== "Genre") {
            let valorFiltrado = input.genre.find(genre => genre === event.target.value)
            if (!valorFiltrado) {
                setImput({
                    ...input,
                    genre: [...input.genre, event.target.value]
                })
            }
        }
    }

    function handleSelectPlatform(event) {
        event.preventDefault()
        if (event.target.value !== "Platform") {
            let valorFiltrado = input.platform.find(plat => plat === event.target.value)
            if (!valorFiltrado) {
                setImput({
                    ...input,
                    platform: [...input.platform, event.target.value]
                })
            }
        }
    }

    function handleRemoveGenre(event) {
        event.preventDefault()
        let arrayFiltrado = input.genre.filter(genre => genre !== event.target.value)
        setImput({
            ...input,
            genre: arrayFiltrado
        })
    }

    function handleRemovePlatform(event) {
        event.preventDefault()
        let arrayFiltrado = input.platform.filter(plat => plat !== event.target.value)
        setImput({
            ...input,
            platform: arrayFiltrado
        })
    }

    function handleSubmit(event) {
        event.preventDefault()

        if (input.name === "" || input.description === "" || input.release_date === "" || input.genre === [] || input.platform === [] || input.img === noImage) {
            return alert("You must complete all forms to create a game")
        }
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
        navigate("/home");
    }

    return (
        <div className="CreateGame">

            <Link to='/home'><button>Back to Home!</button></Link>

            <img id="imagenJuego" src={input.img}></img>
            <h1>Create your own game !</h1>
            <form onSubmit={(event) => handleSubmit(event)} className="Form">

                <div className="Label">
                    <label>Name</label>
                    <input
                        type='text'
                        size="40"
                        value={input.name}
                        name='name'
                        placeholder="Your game name..."
                        onChange={(event) => handleInput(event)}
                    />
                </div>
                <div className="Label">
                    <label>Description</label>
                    <textarea id="Description"
                        type='text'
                        value={input.description}
                        name='description'
                        placeholder=" Here you can put a short description of your game"
                        rows="5" cols="55"
                        onChange={(event) => handleInput(event)}
                    />
                </div>
                <div className="Label">
                    <label>Release Date</label>
                    <input
                        type='date'
                        value={input.release_date}
                        name='release_date'
                        onChange={(event) => handleInput(event)}
                    />
                </div>
                <div className="Label">
                    <label>Rating</label>
                    <input
                        type='number'
                        value={input.rating}
                        name='rating'
                        min="1" max="5"
                        onChange={(event) => handleInput(event)}
                    />
                </div>
                <div className="Label">
                    <label>Image</label>
                    <input
                        type='text'
                        size="80"
                        value={input.img}
                        name='img'
                        placeholder="Example : https://i.pinimg.com/564x/be/a4/77/bea4776a5c6fdcbee7671d1c9550a159.jpg"
                        onChange={(event) => handleInput(event)}
                    />
                </div>
                <div className="Select">
                    <select onChange={(event) => handleSelectGenre(event)}>
                        <option>Genre</option>
                        {
                            allGenres && allGenres.map(gen => {
                                return (
                                    <option value={gen.name}>{gen.name}</option>
                                )
                            })
                        }
                    </select>
                    <ul>{input.genre.map(gen => { return (<li>{gen}<button value={gen} onClick={(event) => handleRemoveGenre(event)}>X</button></li>) })}</ul>
                </div>

                <div className="Select">

                    <select onChange={(event) => handleSelectPlatform(event)}>
                        <option>Platform</option>
                        {
                            allPlatforms && allPlatforms.map(plat => {
                                return (
                                    <option value={plat}>{plat}</option>
                                )
                            })
                        }
                    </select>
                    <ul>{input.platform.map(plat => { return (<li>{plat}<button value={plat} onClick={(event) => handleRemovePlatform(event)}>X</button></li>) })}</ul>
                </div>
                <button id="submit" type="submit">Create Game</button>
            </form>
        </div>
    )
}