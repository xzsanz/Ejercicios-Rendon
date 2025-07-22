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
//LOGIN
  const login = async (username, password) => {
    try {
      const response = await axios.post('http://10.0.2.2:5000/api/auth/login', {
        username,
        password,
      });

      setAuthToken(response.data.token);
      setUsername(response.data.username);
      await AsyncStorage.setItem('authToken', response.data.token);
      await AsyncStorage.setItem('username', response.data.username);
    } catch (error) {
      //console.error('Error en login:', error.response?.data || error.message);
      throw new Error('Usuario o contraseña incorrectos');
    }
  };

const register = async (username, password) => { //http://localhost:5000/api/auth/login

  try {
    const response = await axios.post('http://10.0.2.2:5000/api/auth/register', {
      username,
      password,
    });

    console.log('Respuesta de registro:', response.data); // 🐞 DEBUG

    const { token, username: returnedUsername } = response.data;

    if (!token || !returnedUsername) {
      throw new Error('Faltan datos en la respuesta del servidor');
    }

    setAuthToken(token);
    setUsername(returnedUsername);
    await AsyncStorage.setItem('authToken', token);
    await AsyncStorage.setItem('username', returnedUsername);

  } catch (error) {
    console.error('Error en registro:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al registrar');
  }
};


  const logout = async () => {
    setAuthToken(null);
    setUsername('');
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('username');
  };

  // 👉 register agregado aquí
  return (
    <AuthContext.Provider value={{ authToken, username, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);