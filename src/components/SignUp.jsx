import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore"; // Make sure to import Firestore functions
import { db } from "../firebase"; // Make sure to import the Firestore reference

export async function addUser(user) {
  try {
    const userDocRef = doc(db, "users", user.uid); // Assuming you have a `db` reference defined elsewhere
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      await setDoc(userDocRef, user);
    } else {
      console.log("User id", user.uid, "findes allerede i databasen");
    }
  } catch (error) {
    console.error("Fejl ved at oprette bruger", error); // Changed console.log to console.error
  }
}

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const navigate = useNavigate();

  async function signUp(e) { // Removed the unnecessary semicolon
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password, displayName);
      navigate('/Login');
      console.log(userCredential);
      await addUser({
        name: userCredential.user.email,
        uid: userCredential.user.uid,
        displayName: displayName,
        movies_seen: [],
        friends: [],
      });
    } catch (error) {
      console.error(error);
    }
  }

  const inputStyle = {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    color: 'black',
    flexDirection: 'column',
    fontFamily: 'raleway',
    height: '2rem',
    lineHeight: '1.5rem',
    width: '100%',
    borderRadius: '10px',
    border: 'none',
    marginTop: '0.8rem',
  };

  return (
    <div>
      <form onSubmit={signUp}>
        <h1 className="log-text">Opret bruger</h1>
        <div>
          <input
            style={inputStyle}
            type="email"
            placeholder="Indtast din email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            style={inputStyle}
            type="text"
            placeholder="Indtast brugernavn"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div>
          <input
            style={inputStyle}
            type="password"
            placeholder="Indtast din adgangskode"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="submitBtn" type="submit">
          Opret bruger
        </button>
      </form>
    </div>
  );
}