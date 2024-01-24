// context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const login = (username, password) => {
    // Perform login logic (e.g., send data to the server and verify credentials)
    // For simplicity, I'm using a hardcoded check in this example
    if (username === 'user' && password === 'password') {
      setAuthenticated(true);
    } else {
      throw new Error('Invalid username or password');
    }
  };

  const logout = () => {
    // Perform logout logic (e.g., clear authentication tokens)
    setAuthenticated(false);
  };

  const value = {
    authenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
