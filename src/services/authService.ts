import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const authService = {
  login: async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth/login`, { 
      username, 
      password 
    });
    return response.data;
  },
  register: async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth/register`, { 
      username, 
      password 
    });
    return response.data;
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};