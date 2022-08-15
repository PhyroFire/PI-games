import { Link } from "react-router-dom";
import React from "react";
import '../CSS/LandingPage.css'
import video from '../CSS/IntroVid.mp4'


export default function LandingPage() {
    return (
        <div className="body_landing">

            <div className="landing">
            <video autoPlay="autoplay" muted type={"video/mp4"} preload="auto" loop src={video}></video>

                <Link to='/home'>
                    <h1>Henry Game's Proyect</h1>
                </Link>
            </div>

            <h3>Welcome to Game's API</h3>
            <p>In this page you can see different games info with relevant information using the RAWG external API. Also you can create your own games!</p>

        </div>
    )
}