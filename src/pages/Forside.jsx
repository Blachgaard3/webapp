import { Link } from "react-router-dom";
import Authdetails from "../components/AuthDetails";
import Profile from "../components/Profile";
import logocow from "../assets/Logocowboy.png";


export default function ForsidePage() {    
    return(
        <>
        <Authdetails />
        <Profile />
            <h1 className="movie-header">Movie Magnet</h1>
            <hr className="line" />
            <p className="movie-tekst">Din filmanbefaling er kun <strong>et klik væk!</strong></p>
            <p className="movie-tekst-to">Klar til at komme igang?</p>
            <p className="movie-tekst-to">I vores app, har du også dit helt eget film bibliotek. 
            Så du kan holde styr på hvilke film du har set.</p>
            <img src={logocow} alt="Billede af logo" className="logo-cowboy"/>
            
            <div className="buttons-front">
            <Link to="/Swipe" className="button-front">Swipe</Link>
            <Link to="/Findfilm" className="button-front">Find Film</Link>
            </div>
        </>
    )
}