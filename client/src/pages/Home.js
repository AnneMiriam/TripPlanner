import "../styles.css";
import React from "react";
import NavBar from "../components/NavBar";

function Home() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1 className="home-header">PATHFINDERS</h1>
        <h1 className="home-header">PARADISE</h1>
      </main>
    </>
  );
}

export default Home;
