import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await AsyncStorage.getItem('authToken');
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedToken) {
        setAuthToken(storedToken);
        setUsername(storedUsername);
      }
    };
    checkToken();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://192.168.16.112:5000/api/auth/login', {
        username,
        password,
      });

      // Si el login es exitoso
      setAuthToken(response.data.token);
      setUsername(response.data.username);
      await AsyncStorage.setItem('authToken', response.data.token);
      await AsyncStorage.setItem('username', response.data.username);
    } catch (error) {
      console.error('Error en login:', error.response?.data || error.message);
      throw new Error('Usuario o contraseña incorrectos');
    }
  };

  const logout = async () => {
    setAuthToken(null);
    setUsername('');
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{ authToken, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
