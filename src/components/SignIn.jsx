import React, { useState } from "react";
import { auth, app } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";


export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate('');
  

  function signIn(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/Forside');
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const signInstyle = {
    display: 'flex',
    flexDirection: 'column',
    borderBottom: '2px solid white',
    paddingBottom: '1rem',
   
  
  };
  const inputStyle = {
    justifyContent:'center',
    textAlign:'center',
    alginItems:'center',
    color:'black',
    flexDirection:'column',
    fontFamily:'raleway',
    height:'2rem',
    lineHeight:'1.5rem',
    width:'100%',
    borderRadius:'10px',
    border:'none',
    marginTop:'0.8rem',
  };

  return (
    <div style={signInstyle}>
      <form onSubmit={signIn}>
        <h1 className="log-text">Har du allerede en bruger?</h1>
        <div>
        <input style={inputStyle}
          type="email"
          placeholder="Indtast din email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div>
        <input style={inputStyle}

          type="password"
          placeholder="Indtast din adgangskode"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <button className="submitBtn" type="submit">Log ind</button>
      </form>
    </div>
  );
}