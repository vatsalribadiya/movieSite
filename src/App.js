import React, { useState } from 'react';
import './index.css';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarNew from './componet/Navbar'
import Home from './componet/Home';
import Movie from './componet/Movie';
import Tvshows from './componet/Tvshows';
import Myinfo from './componet/Myinfo';
import Reviews from './componet/Reviews';
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const [progress, setProgress] = useState(0);
  function setProgressBar(progress) {
    setProgress(progress);
  }
  return (
    <div className='App'>
      <Router>
      <NavbarNew/>
      <LoadingBar color='#f11946' progress={progress} onLoaderFinished={() => setProgress(0)}/>
        <Routes>
            <Route exact path="/" element={<Home setProgress={setProgressBar}/>} />
            <Route exact path="/movie" element={<Movie setProgress={setProgressBar}/>} />
            <Route exact path="/tvshows" element={<Tvshows setProgress={setProgressBar}/>} /> 
            <Route path='*' element={<Myinfo setProgress={setProgressBar}/>}/>
            <Route path='*' element={<Reviews setProgress={setProgressBar}/>}/>
          </Routes>
       </Router>
    </div>
  );
};

export default App;
