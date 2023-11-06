import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

export default function FindFilmPage() {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [filmInfo, setFilmInfo] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const user = getAuth().currentUser;
  

  const markFilmAsSeen = async () => {
    if (filmInfo && user) { // Hvis der er en film og en bruger er logget ind så er det muligt at gemme filmen på brugerens profil
      try {
        // Opret en reference til brugerens Firestore-dokument
        const userDocRef = doc(db, 'users', user.uid);

        // Opdater dokumentet ved at tilføje filmen til movies_seen-arrayet
        await updateDoc(userDocRef, {
          movies_seen: arrayUnion(filmInfo), // Tilføj filmen til movies_seen-arrayet
        });

        console.log('Film markeret som set');
      } catch (error) {
        console.error('Fejl ved at tilføje film som set', error);
      }
    }
  };
  
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    document.getElementById("findFilmen").addEventListener("click", function () {
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
      for (let page = 1; page <= 20; page++) { // Hent 20 sider med film 
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

  const movieHeader = {
    fontFamily: 'Coiny',
    color: 'white',
    textAlign: 'center',
    fontSize: '1rem',
  };

  const voteStyle = {
    color: 'white',
  };

  return (
    <>
      <main>
        <div className="inputBox">
          <label htmlFor="genreSelect">Hvilken genre er du i stemning til?</label>
          <select id="genreSelect" onChange={handleGenreChange} value={selectedGenre}>
            <option value="">Ingen valgt</option>
            {Object.entries(genreId).map(([id, name]) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>

          {filmInfo && (
            <div className="film-info-box">
              <img className='moviePoster' src={`https://image.tmdb.org/t/p/w300${filmInfo.poster_path}`} alt={filmInfo.title} />
              

              

              <div className="movie-info-text">
                <h2 style={movieHeader}>{filmInfo.title}</h2>
                <p style={voteStyle}>Rating: {filmInfo.vote_average}</p>
              </div>

              <button id="gemFilmen" onClick={markFilmAsSeen}>Markér som set</button>
            </div>
          )}
          <div className='inputBox'>
            <button id="findFilmen">Find Film</button>
          </div>
        </div>
      </main>
      
    </>
  );
}

