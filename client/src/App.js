import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './Components/LandingPage.jsx'
import Home from './Components/Home.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;
