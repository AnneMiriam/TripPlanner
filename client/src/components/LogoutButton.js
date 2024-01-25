import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ setUser }) => {
  const navigate = useNavigate();

  const logout = () => {
    fetch("/logout", { method: "DELETE" })
      .then(() => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/');
      });
  };

  return (
    <button className="button" type='button' onClick={logout}>Logout</button>
  );
};

export default LogoutButton;
