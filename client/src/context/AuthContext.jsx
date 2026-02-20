import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Define the dynamic API URL
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) setUser(userInfo);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Replaced hardcoded localhost with API_URL
    const { data } = await axios.post(`${API_URL}/api/auth/login`, { email, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    setUser(data);
    return data;
  };

  const signup = async (username, email, password) => {
    // Replaced hardcoded localhost with API_URL
    const { data } = await axios.post(`${API_URL}/api/auth/signup`, { username, email, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    setUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);