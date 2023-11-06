import { Link } from "react-router-dom";
import Cooklogo from "../assets/cookmagney.png";
import profile from "../assets/Profilbillede.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function RoomPage() {
    return (
        <section>

            <div className="navigation-profile">
                <Link to="/swipe"><FontAwesomeIcon icon={faArrowLeft} className="arrow-left" /></Link>
                <img src={profile} alt="Billede af profil" className="profil-picture-to" />
            </div>
            <p className="room-text">1. Tryk på knappen inviter til rum (det vil automatisk kopiere linket).</p>
            <p className="room-text">2. Inviter personen ved at sende linket.</p>
            <p className="room-text">3. Når personen deltager i rummet trykker du på start rum.</p>
            <p className="room-text">4. Nu mangler i bare at blive enige om en film, når i får et match får i en notifikation.</p>
            
            <img src={Cooklogo} alt="Billede af logo" className="logo-straw"/>
            <div className="button-room-container">
        <Link to="/" className="button-room">Inviter til rum</Link>
        </div>
        <div className="join-room">
        <h3>Nuværende deltagere</h3>
        <p>Carl</p>
        <p>Kasper</p>
        <p>Cecilie</p>
        </div>
        <div className="swipe-container">
            <Link to="/room" className="button-swipe">Start</Link>
        </div>
        
        </section>
    )
}