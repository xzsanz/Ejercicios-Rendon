// src/api.js
import axios from 'axios';
const API_URL = 'http://10.0.2.2:5000/api/auth/login';



export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(API_URL, { username, password });
    return response.data;
  } catch (error) {
    console.error('Error al hacer login:', error.response?.data || error.message);
    throw error;
  }
};
