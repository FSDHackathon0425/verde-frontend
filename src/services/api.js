import axios from 'axios';

// Configuración base de la API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3333/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptores para manejar errores y autenticación
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error.response?.data || error.message);
  }
);

export const getMenu = async (restaurantId) => {
  return api.get(`/restaurants/${restaurantId}/menu`);
};

export const createOrder = async (orderData) => {
  return api.post('/orders', orderData);
};

export default api;