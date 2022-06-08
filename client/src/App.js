import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage.jsx'
import Home from './Components/Home.jsx'
import React from "react";
import GameDetail from './Components/GameDetail.jsx'
import CreateGame from './Components/CreateGame';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/createGame' element={<CreateGame/>} />
        <Route path='/videogame/:id' element={<GameDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
