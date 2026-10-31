import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const authService = {
  register: async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/users`, userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return response.data;
  }
};
