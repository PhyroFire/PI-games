import { getAllVideogames } from "../Actions/Index";
import { getAllGenres } from "../Actions/Index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Game from './Game.jsx'


export default function Home(){ 

    const dispatch = useDispatch()
    const videogames = useSelector(store => store.videogames)
    const genres = useSelector(store => store.genres)

    useEffect(()=>{
        dispatch(getAllVideogames())
        dispatch(getAllGenres())
    },[])


    // por que no me deja escribir JS normal ?
    return(
        <div>
            <h1>HOME PAGE</h1>
            <select>
                {
                    genres&&genres.map( gen => {
                        return (
                           
                            <option value={gen.name}>{gen.name}</option>
                        )
                    })
                }
            </select>
            {
                videogames?videogames.map( game => { 
                    console.log(game)
                    return (
                        <Game name={game.name} img={game.img} genres={game.genres}/>
                    )
                })
                :
                <h1>cargando</h1>
            }
        </div>
    )
  }