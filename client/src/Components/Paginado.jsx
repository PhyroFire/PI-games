import React from "react";
import '../CSS/Paginado.css'

export default function Paginado({ gamesXPage, allgames, pages, currentPage }) {

    let pageNumbers = []

    for (let index = 1; index <= Math.ceil(allgames / gamesXPage); index++) {
        pageNumbers.push(index)
    }

    if (currentPage > pageNumbers.length) { // ARREGLAR
        console.log(pageNumbers)
        pages(1)
    }

    return (
        <nav>
            <ul className="Paginado">
                {
                    pageNumbers &&
                    pageNumbers.map(number => {
                        return (
                            <li key={number}>
                                <button onClick={() => pages(number)}>{number}</button>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}