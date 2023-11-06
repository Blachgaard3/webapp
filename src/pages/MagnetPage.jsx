
import { Link } from "react-router-dom";
import moviemagmey from "../assets/moviemagmey.png";
import GhostIcon from "../components/GhostIcon";
import HeartIcon from "../components/HeartIcon";
import ComedyIcon from "../components/ComedyIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function MagnetPage() {
    return (
    <section>
        <Link to="/profile"><FontAwesomeIcon icon={faArrowLeft} className="arrow-left"/></Link>
        <h1>Magnets</h1>
        <img src={moviemagmey} alt="Billede af logo" className="logo-magnet" />
        <p className="room-text">Vi har valgt at introducere 'Magnets,' som du kan optjene ved at udforske forskellige filmgenrer.<br /><br /> For eksempel kan du opnå et 'Horror Magnet,' når du har set 10 gyserfilm. Dette gælder også for andre spændende genrer. Når du optjener en Magnet, vil det blive vist på din profil som et æresmærke for din filmoplevelse.</p>
        <h3 className="movie-magnet-text">Film Magnets</h3>

        <div className="magnet-icons">
            <div className="movie-magnet-number">
                <GhostIcon />
                <p className="ten-movies-text">10 Film</p>
            </div>

            <div className="movie-magnet-number">
                <HeartIcon />
                <p className="ten-movies-text">10 Film</p>
            </div>

            <div className="movie-magnet-number">
                <ComedyIcon />
                <p className="ten-movies-text">10 Film</p>
            </div>
        </div>

        <div className="magnet-icons">
            <div className="movie-magnet-number">
                <GhostIcon />
                <p className="ten-movies-text">10 Film</p>
            </div>

            <div className="movie-magnet-number">
            <HeartIcon />
                <p className="ten-movies-text">10 Film</p>
            </div>

            <div className="movie-magnet-number">
                <ComedyIcon />
                <p className="ten-movies-text">10 Film</p>
            </div>
         </div>
         <br /><br /><br />
    </section>
    )
}