// aqui va estar mi arxchico base de axios para hacer las peticiones a la api

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;
