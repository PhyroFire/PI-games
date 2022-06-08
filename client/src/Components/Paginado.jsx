import React from "react";

export default function Paginado({ gamesXPage, allgames, pages }) {

    let pageNumbers = []

    for (let index = 1; index <= Math.ceil(allgames / gamesXPage); index++) {
        pageNumbers.push(index)
    }

    if (pageNumbers < 2) {
        pages(1)
    }

    return (
        <nav>
            <ul>
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