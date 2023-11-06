import React from 'react';
import {NavLink} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHouse, faFilm, faPhotoFilm,faHandPointer} from '@fortawesome/free-solid-svg-icons';

//styling til de links som er i vores menu bar, lavet som en const for at gøre det nemmere at ændre på stylingen
  const linkStyles = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    flexDirection: 'column',
    color: 'white',
    paddingTop:'0.5rem',
    fontFamily:'Coiny',
    fontWeight:'100',
    boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.75)',
    cursor:'pointer',
    fontSize:'0.9rem',
  };

  const iconStyles = {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
  };
  export default function Menu() {
    const location = useLocation();
    const allowedPaths = ["/Forside", "/FindFilm", "/MineFilm", "/Swipe", "/room", "/Findfilm"];
    const shouldShowMenu = allowedPaths.includes(location.pathname);
  
    if (!shouldShowMenu) {
      return null;
    }
  
    return (
      <menu className="appMenu">
        <NavLink to="/Forside" style={linkStyles}><FontAwesomeIcon icon={faHouse} style={iconStyles} />Forside</NavLink>
        <NavLink to="/FindFilm" style={linkStyles}><FontAwesomeIcon icon={faFilm} style={iconStyles} />Find Film</NavLink>
        <NavLink to="/MineFilm" style={linkStyles}><FontAwesomeIcon icon={faPhotoFilm} style={iconStyles} />Mine Film</NavLink>
        <NavLink to="/Swipe" style={linkStyles}><FontAwesomeIcon icon={faHandPointer} style={iconStyles} />Swipe</NavLink>
      </menu>
    );
  }