import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';

export default function MineFilmPage() {
    const [moviesSeen, setMoviesSeen] = useState([]);
    const [displayName, setDisplayName] = useState(''); // Tilføj tilstand for brugerens navn

    useEffect(() => {
        // Kontroller om brugeren er logget ind
        if (auth.currentUser) { // Hvis brugeren er logget ind
            const userUid = auth.currentUser.uid; // Hent brugerens UID
            async function fetchData() { // Opret en async-funktion, så vi kan bruge await 
                try {
                    // Få fat i brugerens dokument
                    const userDocRef = collection(db, 'users'); // Opret en reference til users-kollektionen
                    const userDocSnapshot = await getDocs(query(userDocRef, where("uid", "==", userUid))); // Hent dokumentet med det rigtige UID

                    if (userDocSnapshot.size === 0) { // Hvis dokumentet ikke findes i databasen 
                        console.error("Brugeren blev ikke fundet i databasen."); 
                        return;
                    }

                    const userData = userDocSnapshot.docs[0].data(); 
                    const moviesSeenData = userData.movies_seen || []; // Sørg for, at movies_seen er et array

                    console.log("moviesSeenData:", moviesSeenData); // Tilføj denne linje

                    setMoviesSeen(moviesSeenData);
                    setDisplayName(userData.displayName); // Sæt brugerens navn i tilstanden
                } catch (error) {
                    console.error('Fejl ved hentning af brugerdata', error);
                }
            }

            fetchData();
        }
    }, [auth]);

    const movieBox = {
        marginTop:'2rem',
        width: '100%',
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center',
        gap:'2%',
    };
    const moviePoster = {
        width:'30%',
        marginBottom:'2%',
    };
    const mineFilmTop = {
        position:'fixed',
        top:'0',
        width:'100%',
        marginBottom:'2rem',
        backgroundColor:'#292929',
        height:'2rem',
    };
    const minefilmh2 = {
        fontSize:'1.5rem',
        textAlign:'center',
        marginTop:'0.5rem',
        marginBottom:'0.5rem',
    };
    return (
        <main>
            <div style={mineFilmTop}>
                <h2 style={minefilmh2}>{displayName}</h2> 
            </div>
            <section style={movieBox}>
                {moviesSeen.map((movie, index) => (
                    <img key={index} src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} style={moviePoster} alt={`Movie Poster`} />   
                ))}
            </section>
        </main>
    );
}