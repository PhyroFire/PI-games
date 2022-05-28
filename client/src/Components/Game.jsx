export default function Game({name,img,genres}){
    return (
        <div>
            <img src={img}/>
            <h1>{name}</h1>
            {
                genres.map(gen =>{
                    return (
                        <div>
                         <p>{gen.name?gen.name : gen}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}