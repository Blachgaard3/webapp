import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import InfoIcon from '@mui/icons-material/Info';
import moviemagmeymatch from "../assets/moviemagmeymatch.png";
import Star from "../assets/Star.png";

export default function Film() {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [filmInfo, setFilmInfo] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const user = getAuth().currentUser;
  

 
  
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    document.getElementById("NyFilm").addEventListener("click", function () {
      const genreParam = selectedGenre ? `&with_genres=${selectedGenre}` : '';

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTMxMTIzYjhkNzYyODdiYjYzOGYyMDYxYzZjOWIyZSIsInN1YiI6IjY1MzRlZjM4NDJkODM3MDEwYmE5MDc5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nQxMi8CDd0PrswV2ukwd9QoO4faupkSrnIs0hHpi9no' // Husk at erstatte med din egen API-nøgle
        }
      };
      // Opret en række af fetch-anmodninger til forskellige sider
      const fetchPromises = [];
      for (let page = 1; page <= 50; page++) { // Hent 50 sider med film 
        const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc${genreParam}`;
        fetchPromises.push(fetch(url, options));
      }

      Promise.all(fetchPromises) // Vent på at alle anmodninger er færdige 
        .then(responses => Promise.all(responses.map(response => response.json()))) 
        .then(dataArray => { 
          // Sammenføj resultaterne fra alle sider
          const allMovies = dataArray.flatMap(data => data.results); 

          if (allMovies.length > 0) {
            const filteredMovies = allMovies.filter(movie => movie.genre_ids.includes(parseInt(selectedGenre)));
            if (filteredMovies.length > 0) {
              const randomIndex = Math.floor(Math.random() * filteredMovies.length);
              const tilfældigFilm = filteredMovies[randomIndex];
              setFilmInfo(tilfældigFilm);
              console.log(tilfældigFilm);
            } 
          }
        })
        .catch(err => console.error(err));
    });
  }, [selectedGenre]);

  const genreId = { // Liste over alle genrer som vi har hentet fra TMDB API og deres tilhørende ID
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };





  return (
    <>
      <main>
        <div className="swipeBox">
          <label htmlFor="genreSwipe"></label>
          <select id="genreSwipe" onChange={handleGenreChange} value={selectedGenre}>
            <option value="">Genre</option>
            {Object.entries(genreId).map(([id, name]) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>

          {filmInfo && (
            <div className="swipe-info-box">
              <img className='swipePoster' src={`https://image.tmdb.org/t/p/w300${filmInfo.poster_path}`} alt={filmInfo.title} />
              

              

              <div className="swipe-info-text">
                <div className='titel' >{filmInfo.title}</div>
                <p className='rating' >Rating: {filmInfo.vote_average}</p>
              </div>

            
            </div>
          )}
          
          <div className='gradiant'></div>

              <InfoIcon className='info'/>
          
        <div className='bottomButtons'>
          <div id='NyFilm' className='NejKnap'>
        <IconButton className='Nej' >
          <ThumbDownIcon fontSize='large' />
        </IconButton>
      </div>
          <div id='NyFilm' className='JaKnap'onClick={openModal}>
        <IconButton className='Ja'>
          <ThumbUpIcon fontSize='large' />
        </IconButton>
        </div>
        </div>
        <Modal open={isModalOpen} onClose={closeModal}>
        {/* Modal indhold */}
        <div className='modalBox'>
        <img src={moviemagmeymatch} alt="Billede af logo" className="moviemagmey-picture-swipe" />
        <img src={Star} alt="Billede af stjerne" className="Star1" />
        <img src={Star} alt="Billede af stjerne" className="Star2" />
        <img src={Star} alt="Billede af stjerne" className="Star3" />
            <div className='modalBanner'>
              <h2 className='modalTitel'>Du har et Match</h2>
            </div>
          </div>
      </Modal>

        </div>
      </main>
      
    </>
  );
}

