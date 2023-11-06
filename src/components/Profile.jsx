import { Link } from "react-router-dom";
import maleuser from "../assets/maleuser.png";

const profileStyle = {
    fontSize:'4rem',
    color: 'white',
};

export default function Profile() {
        return (
            <div>
            <Link to="/profile">
            <img src={maleuser} alt="Billede af bruger" className="user-profile" />
            </Link>
            </div>
    
        )
    
    }


