import { Link } from "react-router-dom";
import maleuser from "../assets/maleuser.png";
import logostraw from "../assets/logostraw.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function SwipePage() {
    return(
        <section>
            <div className="navigation-profile">
                <Link to="/Forside"><FontAwesomeIcon icon={faArrowLeft} className="arrow-left"/></Link>
                <img src={maleuser} alt="Billede af profil" className="profil-picture-to" />
            </div>

        <img src={logostraw} alt="Billede af logo" className="logo-straw"/>

        <h1 className="movie-header">Swipe</h1>
        <p className="room-text">Inviter din ven/venner eller kæreste til en omgang film match. På den måde kan i ved hjælp af et Ja eller Nej finde frem til en film i gerne vil se.<br /><br />I får de samme film forslag, og alt i skal gøre er at svare “Ja” eller “Nej”.<br /><br />

        I får en notifikation når i har fået et match. Nu ved i hvilken film i skal se, god fornøjelse.</p>

        <div className="swipe-container">
            <Link to="/Swiper" className="button-swipe">Opret rum</Link>
        </div>
        </section>
    )
}