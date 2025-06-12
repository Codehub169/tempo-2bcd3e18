import axios from 'axios';

const API_BASE_URL = '/api'; // Proxy will handle http://localhost:3001 during development if CRA dev server is used.
                               // For production build, server on port 9000 should serve API under /api path.

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generic error handler
const handleApiError = (error, context = 'operation') => {
  console.error(`API Error during ${context}:`, error.response || error.message || error);
  if (error.response && error.response.data && error.response.data.message) {
    throw new Error(error.response.data.message);
  }
  throw new Error(`Failed to ${context}. Please try again later.`);
};

// Fetch services
export const getServices = async (params) => {
  try {
    const response = await apiClient.get('/clinic/services', { params });
    return response.data;
  } catch (error) {
    handleApiError(error, 'fetch services');
  }
};

// Fetch doctors
export const getDoctors = async (params) => {
  try {
    const response = await apiClient.get('/clinic/doctors', { params });
    return response.data;
  } catch (error) {
    handleApiError(error, 'fetch doctors');
  }
};

// Fetch clinic information
export const getClinicInfo = async () => {
  try {
    const response = await apiClient.get('/clinic/info');
    return response.data;
  } catch (error) {
    handleApiError(error, 'fetch clinic information');
  }
};

// Submit appointment form
export const submitAppointment = async (formData) => {
  try {
    const response = await apiClient.post('/appointments/submit', formData);
    return response.data;
  } catch (error) {
    handleApiError(error, 'submit appointment');
  }
};

// Submit contact form
export const submitContactForm = async (formData) => {
  try {
    const response = await apiClient.post('/clinic/contact', formData);
    return response.data;
  } catch (error) {
    handleApiError(error, 'submit contact form');
  }
};

// Example of how to use this in a component:
/*
import { getServices } from './services/api';

useEffect(() => {
  const loadServices = async () => {
    try {
      const servicesData = await getServices({ limit: 3 });
      setServices(servicesData);
    } catch (error) {
      // Error is already logged by handleApiError, set error state for UI
      setError(error.message);
    }
  };
  loadServices();
}, []);
*/
