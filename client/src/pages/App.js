import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Trips from './Trips'
import Home from './Home';
import Signup from './Signup';
import User from './User';


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
    })
  }, []);

  const logout = () => {
    fetch("/logout", {method: "DELETE"})
    .then(() => {
      setUser(null);
    })
  };

  let view;

  if (user) {
    view = (
      <Router>
        <button type='button' onClick={logout}>Logout</button>
        <Routes>
          <Route index element={<User />} />
          <Route path="/trips" element={<Trips />} />
          {/* <Route path="/sign_up" element={<Signup />} /> */}
        </Routes>
      </Router>
    );
  } else if (user === null) {
    view = (
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser}/>} />
          <Route path="/sign_up" element={<Signup setUser={setUser}/>} />
        </Routes>
      </Router>
    )
  }

  return (
    <div>{view}</div>
  );
};

export default App;
