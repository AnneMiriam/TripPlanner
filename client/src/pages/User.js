// import logo from './assets/PathfindersParadiseLogo.png';
import React from "react";
import "../styles.css";
import NavBar from "../components/NavBar";

function User() {
  const userData = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="homeBackground">
        <h1>Welcome {userData?.username}</h1>
        <p>User ID: {userData?.id}</p>
      </main>
      <div className="homeGridContainer">
        <div className="leftColumn homeColumn">
          <p>
            {" "}
            Embark on a world of adventure and let Pathfinders Paradise be your
            trusty companion.
          </p>
        </div>
        <main className="homeBackground">
          <div>
            <h1 className="home-header">PATHFINDERS</h1>
            <h1 className="home-header">PARADISE</h1>
            <div className="mainContent"></div>
          </div>
        </main>
        <div className="rightColumn homeColumn">
          <p>
            Start your adventure today – your future self will thank you for the
            memories!
          </p>
        </div>
      </div>
    </>
  );
}

export default User;
