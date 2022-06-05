import { Link } from "react-router-dom";
import React from "react";
// import '../CSS/LandingPage.module.css'

export default function LandingPage() {
    return (
        <div>
            <h1>Landing Page</h1>
            <Link to='/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}