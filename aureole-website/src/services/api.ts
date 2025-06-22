import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: '/api', // Uses the proxy setup in package.json
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Define API endpoints
export const apiService = {
  // Auth endpoints
  auth: {
    login: (email: string, password: string) => 
      api.post('/users/login', { email, password }),
    register: (name: string, email: string, password: string) => 
      api.post('/users', { name, email, password }),
    getProfile: () => api.get('/users/profile'),
    updateProfile: (userData: any) => api.put('/users/profile', userData),
  },
  
  // Products endpoints
  products: {
    getAll: (keyword = '', pageNumber = 1) => 
      api.get(`/products?keyword=${keyword}&pageNumber=${pageNumber}`),
    getById: (id: string) => api.get(`/products/${id}`),
    create: (productData: any) => api.post('/products', productData),
    update: (id: string, productData: any) => api.put(`/products/${id}`, productData),
    delete: (id: string) => api.delete(`/products/${id}`),
  }
};

export default api;
