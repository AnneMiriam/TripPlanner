import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Login({ setUser }) {
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
  
  
  const handleLoginChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    })
      .then((r) => {
        if (!r.ok) {
          throw new Error("Login failed");
        }
        return r.json();
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data)); //added this to locally store the user data for the user page
        setUser(data);
      });
  };

  return (
    <main>
      <NavBar />
      <div></div>
      <div className="loginMain">
        <div className="logoContainer"></div>
        <div className="titleContainer">
          <h1 className="loginTitle">PATHFINDERS PARADISE</h1>
        </div>
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="loginPage">
            <label htmlFor="username">Username: </label>
            <input
              value={loginInfo.username}
              id="username"
              name="username"
              onChange={handleLoginChange}
            />
          </div>
          <div className="loginPage">
            <label htmlFor="password">Password: </label>
            <input
              onChange={handleLoginChange}
              value={loginInfo.password}
              type="password"
              id="password"
              name="password"
            />
            <div>
              <input className="button" type="submit" value="Login" />
            </div>
          </div>
        </form>
        <p>
          Don't have an account? <Link to="/sign_up">Sign Up</Link>
        </p>
      </div>
    </main>
  );
}

// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import NavBar from '../components/NavBar';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState();
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     // Authentication logic (similar to the previous example)
//     if (username === 'user' && password === 'password') {
//       // Redirect to the dashboard on successful login
//       navigate('/');
//     } else {
//       alert('Invalid username or password');
//     }
//   };

//   return (
//     <div>
//       <header>
//         <NavBar />
//       </header>
//       <h2>Login</h2>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Login</button>
//       <p>
//         Don't have an account? <Link to="/signup">Signup</Link>
//       </p>
//     </div>
//   );
// };

// export default Login;
