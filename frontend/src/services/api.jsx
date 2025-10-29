import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // sua API Django
});

// Adiciona JWT no header se existir
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); 
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
