import axios from 'axios';

const api = axios.create({
  baseURL: "https://car-backend-l0bh.onrender.com", 
});

export default api;
