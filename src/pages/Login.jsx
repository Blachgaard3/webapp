import React from "react";
import Authdetails from "../components/AuthDetails";
import SignIn from "../components/signIn";
import SignUp from "../components/signUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function LoginPage() {
    const loginPagesStyle = {
        display:'flex',
        flexWrap:'wrap',
        justifyContent:'center',
        textAlign:'center',
        alginItems:'center',
        color:'white',
        flexDirection:'column',
        fontFamily:'raleway',
        lineHeight:'1.5rem',
        marginLeft:'20%',
        marginRight:'20%',  
    };
    const facebtn = {
        fontFamily:'raleway',
        color:'white',
        border:'none',
        borderRadius:'25px',
        backgroundColor:'#3B5998',
        height:'2rem',
        fontWeight:'boldest',
        fontSize:'1rem',
        marginTop:'0.8rem',
    };
    const googlebtn = {
    backgroundColor:'#F8FFFB',
    height:'2rem',
    border:'none',
    borderRadius:'25px',
    fontFamily:'raleway',
    fontWeight:'boldest',
    fontSize:'1rem',
    marginTop:'0.8rem',
    };
    return(
    <>
    <Link to="/Forside"><FontAwesomeIcon icon={faArrowLeft} className="arrow-left"/></Link>
        <main style={loginPagesStyle}>
            
            <h1 className="log-text">Log ind med</h1>
            <div className="LogContainer">
            <button style={facebtn}>Facebook</button>
            <button style={googlebtn}>
            <span style={{ color: 'blue' }}>G</span>
            <span style={{ color: 'red' }}>o</span>
            <span style={{ color: '#F4B400' }}>o</span>
            <span style={{ color: 'blue' }}>g</span>
            <span style={{ color: 'green' }}>l</span>
            <span style={{ color: 'red' }}>e</span>
            </button>
            </div>
        
        <SignIn />
        <SignUp />
        
        </main>
        </>
    )   
};