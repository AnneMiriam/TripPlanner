// import logo from './assets/PathfindersParadiseLogo.png';
import "../styles.css";
import React from "react";
import NavBar from "../components/NavBar";

function Home() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <div className="gridContainer">
        <div className="leftColumn column">
          <p> Embark on a world of adventure and let Pathfinders Paradise be your trusty companion.</p>
        </div>
        <main className="homeBackground">
          <div>
            <h1 className="home-header">PATHFINDERS</h1>
            <h1 className="home-header">PARADISE</h1>
          <div className="mainContent"></div>
          </div>
        </main>
        <div className="rightColumn column">
          <p>Start your adventure today – your future self will thank you for the memories!</p>
        </div>
      </div>
    </>
  );
}

export default Home;
