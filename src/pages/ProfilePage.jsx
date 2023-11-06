import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import maleuser from "../assets/Maleuser.png";
import logoside from "../assets/moviemagmeyside.png";
import GhostIcon from "../components/GhostIcon";
import HeartIcon from "../components/HeartIcon";
import ComedyIcon from "../components/ComedyIcon";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function ProfilePage() {
  const [isAddFriendModalOpen, setAddFriendModalOpen] = useState(false);
  const [friends, setFriends] = useState([]);
  const [friendName, setFriendName] = useState("");
  const [displayName, setDisplayName] = useState(""); // Tilføj displayName til tilstanden
  const user = auth.currentUser; // Sørg for, at du har auth-objektet defineret et sted

  useEffect(() => {
    if (user) {
      // Opret en reference til brugerens Firestore-dokument
      const userDocRef = doc(db, 'users', user.uid);

      // Hent brugerens dokument fra Firestore
      const getUserData = async () => {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setDisplayName(userData.displayName || "brugernavn");
        }
      };

      getUserData();
    }
  }, [user]);

  const handleAddFriend = async () => {
    if (friendName.trim() !== "") {
      setFriends([...friends, friendName]);
      setFriendName(""); // Clear the input field
      setAddFriendModalOpen(false); // Close the modal

      if (handleAddFriend && user) {
        try {
          // Opret en reference til brugerens Firestore-dokument
          const userDocRef = doc(db, 'users', user.uid);

          // Opdater dokumentet ved at tilføje vennen til friends-arrayet
          await updateDoc(userDocRef, {
            friends: arrayUnion(friendName), // Tilføj vennen til friends-arrayet
          });

          console.log('Ven tilføjet');
        } catch (error) {
          console.error('Ven ikke tilføjet', error);
        }
      }
    }
  };

  return (
    <section>
      <Link to="/Forside">
        <FontAwesomeIcon icon={faArrowLeft} className="arrow-left" />
      </Link>
      <div className="user-container">
        <img src={maleuser} alt="Billede af bruger" className="user-profile" />
      </div>
      <h1 className="john-text">{displayName}</h1>
      <h2 className="titel-text">Casual Watcher</h2>

      <img src={logoside} alt="Billede af logo" className="logo-side" />

      <h3 className="icons-text">Mine Film Magnets</h3>

      <div className="profile-icons">
        <GhostIcon />
        <HeartIcon />
        <ComedyIcon />
      </div>

      <div className="button-magnet-container">
        <Link to="/magnet" className="button-magnet">
          Opnå Magnets
        </Link>
      </div>

      <h3 className="my-friends-text">Mine Venner</h3>
      {friends.length === 0 ? (
        <p className="empty-text">Der er godt nok tomt lige nu</p>
      ) : (
        <div className="friends">
          {friends.map((friend, index) => (
            <div className="brian-friend" key={index}>
              <img src={maleuser} alt="Billede af bruger" className="friend" />
              <p>{friend}</p>
            </div>
          ))}
        </div>
      )}

      <div className="button-friends-container">
        <button className="button-magnet" onClick={() => setAddFriendModalOpen(true)}>
          Tilføj Ven
        </button>
      </div>

      <h3 className="movie-history-text">Filmhistorik</h3>

      {/* Modal for adding friends */}
      {isAddFriendModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Tilføj Ven</h2>
            <input
              type="text"
              placeholder="Navn på ven"
              value={friendName}
              onChange={(e) => setFriendName(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={() => setAddFriendModalOpen(false)}>Annuller</button>
              <button onClick={handleAddFriend}>Tilføj</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
