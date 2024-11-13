import axios from 'axios';

// Base URL of the backend server (adjust this based on your environment)
const BASE_URL = 'http://localhost:5000/api';  // Change this if your backend URL is different

// Create an Axios instance
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add the JWT token to the request header if it's available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Get token from localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Error handling for responses
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token expired or unauthorized error
            localStorage.removeItem('token');
            // Optionally, redirect user to login page
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export { api };
