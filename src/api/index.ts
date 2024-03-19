// aqui va estar mi arxchico base de axios para hacer las peticiones a la api

import axios from 'axios';

export const URLbase = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: URLbase,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;
