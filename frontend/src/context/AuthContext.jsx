import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Create axios instance with retry logic for auth requests
const createAuthAxiosInstance = () => {
  const instance = axios.create({
    timeout: 30000, // 30 seconds
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const config = error.config;
      if (!config._retry) config._retry = 0;

      if (
        config._retry < 3 &&
        (error.code === 'ECONNABORTED' ||
          error.code === 'ETIMEDOUT' ||
          error.message.includes('Network Error') ||
          error.message.includes('timeout'))
      ) {
        config._retry += 1;
        console.log(`Retrying auth request (${config._retry}/3)...`);
        await new Promise(resolve => setTimeout(resolve, 1000 * config._retry));
        return instance(config);
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const validateUser = async () => {
      if (token) {
        localStorage.setItem('token', token);
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setCurrentUser(JSON.parse(storedUser));
        }
        // Validate that user still exists in the database
        try {
          const axiosInstance = createAuthAxiosInstance();
          const response = await axiosInstance.get(`${API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          // Update local user data with fresh data from DB
          const freshUser = response.data.user;
          setCurrentUser(freshUser);
          localStorage.setItem('user', JSON.stringify(freshUser));
        } catch (err) {
          // User no longer exists or token is invalid — force logout
          console.warn('User validation failed, logging out:', err.message);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setToken(null);
          setCurrentUser(null);
        }
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setCurrentUser(null);
      }
      setLoading(false);
    };
    validateUser();
  }, [token]);

  const signup = async (email, password, displayName) => {
    const axiosInstance = createAuthAxiosInstance();
    const response = await axiosInstance.post(`${API_URL}/auth/signup`, { email, password, displayName });
    setToken(response.data.token);
    setCurrentUser(response.data.user);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  };

  const login = async (email, password) => {
    const axiosInstance = createAuthAxiosInstance();
    const response = await axiosInstance.post(`${API_URL}/auth/login`, { email, password });
    setToken(response.data.token);
    setCurrentUser(response.data.user);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  };

  const updateUser = (updatedFields) => {
    const updated = { ...currentUser, ...updatedFields };
    setCurrentUser(updated);
    localStorage.setItem('user', JSON.stringify(updated));
  };

  const logout = () => {
    setToken(null);
  };

  const loginWithGoogle = async (googleResponse) => {
    const axiosInstance = createAuthAxiosInstance();
    const response = await axiosInstance.post(`${API_URL}/auth/google`, { 
      idToken: googleResponse.credential 
    });
    setToken(response.data.token);
    setCurrentUser(response.data.user);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  };

  const value = {
    currentUser,
    token,
    signup,
    login,
    logout,
    loginWithGoogle,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
