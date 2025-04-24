import axios from "axios";

const API_URL = "http://tu-backend.com/api/auth";

export const authService = {
  login: (username: string, password: string) => {
    return axios.post(`${API_URL}/login`, { username, password });
  },
  register: (username: string, password: string) => {
    return axios.post(`${API_URL}/register`, { username, password });
  },
};