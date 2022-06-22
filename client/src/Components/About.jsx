import { Link } from "react-router-dom";
import React from "react";
import '../CSS/About.css'

export default function About() {
    return (
        <div className="About">
            <h1>About this API</h1>

            <p>Hi !
                I'm Sergio Romero (31), all my life I have been passionate about technology. I recently discovered the IT world and I love it.
                I am very interested in continuing to learn in order to have more knowledge and improve my programming skills. I am good at teamwork and leading projects as well.
                I have extensive experience working with the public and leading a small team. </p>

            <img src="https://media-exp2.licdn.com/dms/image/C4D03AQE31LQA40C5fQ/profile-displayphoto-shrink_200_200/0/1649854978277?e=1660176000&v=beta&t=5my9IpuIvGou_ie_wBkybFzVFkThvxcpqMUS_wvcc_Y" alt="Sergio Romero" />

            <h2>Visit my LinkedIn!</h2>
            <a href="https://www.linkedin.com/in/sergio-leonel-romero-sanchez-rajoy-fullstack/" target="_blank" rel="noreferrer"><img src="data:image/png;base64,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" alt="LinkedIN" width="200" height="100"/></a>

            <div>
                <Link to='/home'>
                    <button id="backToHome">Back to Home</button>
                </Link>
            </div>
        </div>
    )
}