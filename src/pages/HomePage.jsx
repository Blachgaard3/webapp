
import moviemagnet from "../assets/moviemagnett.png";
import moviemagmey from "../assets/moviemagmey.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

export default function HomePage() {
    return (
    <section>
      <div className="container">
        
        <img src={moviemagnet} alt="Billede af movie" className="movie-picture" />
        <img src={moviemagmey} alt="Billede af logo" className="moviemagmey-picture" />
      
       
        <Link to="/Forside">
  <button className="button-link">Udforsk Appen<FontAwesomeIcon icon={faArrowRight} className="arrow-right" /></button>
</Link>
        
        

      </div>
    </section>
    )
}