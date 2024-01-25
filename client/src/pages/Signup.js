import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Signup({ setUser }) {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
    email: "",
  });
  const handleLoginChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/sign_up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    })
      .then((r) => r.json())
      .then((data) => {
        setUser(data);
      });
  };

  return (
    <main>
      <NavBar />
      <div></div>
      <div className="signupMain">
        <div className="logoContainer"></div>
        <div className="titleContainer">
          <h1 className="loginTitle">PATHFINDERS PARADISE</h1>
        </div>
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="username">Username: </label>
            <input
              value={loginInfo.username}
              id="username"
              name="username"
              onChange={handleLoginChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="email"> Email: </label>
            <input
              value={loginInfo.email}
              id="email"
              name="email"
              onChange={handleLoginChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password: </label>
            <input
              onChange={handleLoginChange}
              value={loginInfo.password}
              type="password"
              id="password"
              name="password"
            />
            <div>
              <input className="button" type="submit" value="Signup" />
            </div>
          </div>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
}

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import NavBar from '../components/NavBar';

// const Signup = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSignup = () => {
//     // Add signup logic here (e.g., send data to the server)
//     // For simplicity, I'm using a basic alert in this example
//     alert(`Signup successful for ${username}`);
//     navigate('/'); // Redirect to the home page after signup
//   };

//   return (
//     <div>
//       <header>
//         <NavBar />
//       </header>
//       <h2>Signup</h2>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleSignup}>Signup</button>
//     </div>
//   );
// };

// export default Signup;
