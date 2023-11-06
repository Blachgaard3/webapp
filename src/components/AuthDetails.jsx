import { onAuthStateChanged, signOut, getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Authdetails() {
    const [authUser, setAuthUser] = useState(null)

    useEffect(() => {
        const auth = getAuth(); // Hent auth-objektet
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user); 
            } else {
                setAuthUser(null);             }
            });

            return () => {
                listen();
            }
        }, []);

        function userSignOut() {
            const auth = getAuth(); // Hent auth-objektet
            signOut(auth).then(() => {
                console.log("succesefuld log ud");
            }).catch(error => console.log(error));
        }
        const loginLinkStyle = {
            textDecoration: 'none',
            color: 'white',
            position:'fixed',
            top:'5px',
            right:'5px',
            fontFamily:'raleway',
            fontSize:'1rem',
        };
        const authStyle = {
            display:'flex',
            flexDirection:'row',
            color:'white',
            position:'fixed',
            top:'5px',
            right:'5px',
            fontFamily:'raleway',
            fontSize:'1rem',
        };
    return (
        <div style={authStyle}>
        {authUser ? (
          <>
            <p>{authUser.email}</p>
            <button onClick={userSignOut}>Log Ud</button>
          </>
        ) : (
          <a href="/Login" style={loginLinkStyle}>Opret/Log ind</a>
        )}
      </div>
    );
}