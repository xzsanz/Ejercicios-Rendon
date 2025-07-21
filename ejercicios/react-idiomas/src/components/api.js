// src/api.js
import axios from 'axios';
const API_URL = 'http://192.168.0.144:5000/api/auth/login';  // Si usas el emulador



export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(API_URL, { username, password });
    return response.data;  // Asegúrate de que la respuesta sea correcta
  } catch (error) {
    console.error('Error al hacer login:', error.response?.data || error.message);
    throw error;
  }
};
