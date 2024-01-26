import React from "react";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"; //KLP added Navigate
import Login from "./Login";
import Trips from "./Trips";
import Home from "./Home";
import Signup from "./Signup";
import User from "./User";
import LogoutButton from "../components/LogoutButton";

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    fetch("/check_session")
      .then((r) => r.json())
      .then((data) => {
        if (data.id) {
          setUser(data);
        } else {
          setUser(null);
        }
      });
  }, []);

  // if (user == undefined) {
  //   return null;
  // }

  return (
    <Router>
      {user && <LogoutButton setUser={setUser} />}{" "}
      {/* Render LogoutButton if user is logged in */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            !user ? <Login setUser={setUser} /> : <Navigate to="/user" />
          }
        />
        <Route
          path="/sign_up"
          element={
            !user ? <Signup setUser={setUser} /> : <Navigate to="/user" />
          }
        />
        <Route
          path="/user"
          element={user ? <User /> : <Navigate to="/login" />}
        />
        <Route
          path="/trips"
          element={user ? <Trips /> : <Navigate to="/login" />}
        />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

//PREVIOUS CODE

// const logout = () => {
//   fetch("/logout", {method: "DELETE"})
//   .then(() => {
//     setUser(null);
//     localStorage.removeItem('user');
//     navigate('/');
//   })
// };

//   let view;

//   if (user) {
//     view = (
//       <Router>
//         {/* <button className="button" type='button' onClick={logout}>Logout</button> */}
//         <LogoutButton setUser={setUser}/>
//         <Routes>
//           <Route index element={<User />} />
//           <Route path="/trips" element={<Trips />} />
//           {/* <Route path="/sign_up" element={<Signup />} /> */}
//         </Routes>
//       </Router>
//     );
//   } else if (user === null) {
//     view = (
//       <Router>
//         <Routes>
//           <Route index element={<Home />} />
//           <Route path="/login" element={<Login setUser={setUser}/>} />
//           <Route path="/sign_up" element={<Signup setUser={setUser}/>} />
//         </Routes>
//       </Router>
//     )
//   }

//   return (
//     <div>{view}</div>
//   );
// };

export default App;
