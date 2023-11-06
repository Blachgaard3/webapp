import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForsidePage from './pages/Forside';
import Menu from './components/AppMenu';
import FindFilmPage from './pages/FindFilm';
import MineFilmPage from './pages/MineFilm';
import SwipePage from './pages/Swipe';
import LoginPage from './pages/Login';
import FilmPage from './pages/FilmPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import MagnetPage from './pages/MagnetPage';
import RoomPage from './pages/RoomPage';
import SwiperPage from './pages/Swiper';

function App() {

  return (
  <>
    <Router>
      <Menu /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Forside" element={<ForsidePage />} />
        <Route path="/FindFilm" element={<FindFilmPage />} />
        <Route path="/MineFilm" element={<MineFilmPage />} />
        <Route path="/Swipe" element={<SwipePage />} />
        <Route path="/Swiper" element={<SwiperPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Findfilm" element={<HomePage />} />
        <Route path="/Profile" element={<ProfilePage />} />
        <Route path="/Magnet" element={<MagnetPage />} />
        <Route path="/room" element={<RoomPage />} />
      </Routes>
    </Router>
      
        
  
    
     
  </>
   
  );
}
export default App
