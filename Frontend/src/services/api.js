//add admin endpoints & import axios from "axios";

// api.js - Centralized API service file
// Contains all Axios calls to the Spring Boot backend organized by resource type

import axios from "axios";

// Base URL for all API requests - points to the Spring Boot backend
const API_BASE_URL = "http://localhost:8080/api";

// City API - Admin only endpoints for managing cities
const cityAPI = {
  getAll: () => axios.get(`${API_BASE_URL}/admin/cities`),
  getById: (id) => axios.get(`${API_BASE_URL}/admin/cities/${id}`),
  create: (city) => axios.post(`${API_BASE_URL}/admin/cities`, city),
  update: (id, city) => axios.put(`${API_BASE_URL}/admin/cities/${id}`, city),
  delete: (id) => axios.delete(`${API_BASE_URL}/admin/cities/${id}`),
};

// Attraction API - Admin only endpoints for managing attractions
const attractionAPI = {
  getAll: () => axios.get(`${API_BASE_URL}/admin/attractions`),
  getById: (id) => axios.get(`${API_BASE_URL}/admin/attractions/${id}`),
  create: (attraction) =>
    axios.post(`${API_BASE_URL}/admin/attractions`, attraction),
  update: (id, attraction) =>
    axios.put(`${API_BASE_URL}/admin/attractions/${id}`, attraction),
  delete: (id) => axios.delete(`${API_BASE_URL}/admin/attractions/${id}`),
};

// Auth API - Handles user and admin registration and login
const authAPI = {
  register: (userData) => axios.post(`${API_BASE_URL}/auth/register`, userData),
  registerAdmin: (adminData) =>
    axios.post(`${API_BASE_URL}/auth/register-admin`, adminData),
  login: (credentials) => axios.post(`${API_BASE_URL}/auth/login`, credentials),
  getUserById: (id) => axios.get(`${API_BASE_URL}/auth/user/${id}`),
};

// Itinerary API - User endpoints for managing saved itineraries
const itineraryAPI = {
  getAll: () => axios.get(`${API_BASE_URL}/itineraries`),
  getById: (id) => axios.get(`${API_BASE_URL}/itineraries/${id}`),
  getByUserId: (userId) =>
    axios.get(`${API_BASE_URL}/itineraries/user/${userId}`),
  create: (itinerary) => axios.post(`${API_BASE_URL}/itineraries`, itinerary),
  update: (id, itinerary) =>
    axios.put(`${API_BASE_URL}/itineraries/${id}`, itinerary),
  delete: (id) => axios.delete(`${API_BASE_URL}/itineraries/${id}`),
};

// Review API - User endpoints for managing reviews on saved itineraries
const reviewAPI = {
  getAll: () => axios.get(`${API_BASE_URL}/reviews`),
  getById: (id) => axios.get(`${API_BASE_URL}/reviews/${id}`),
  getByItineraryId: (itineraryId) =>
    axios.get(`${API_BASE_URL}/reviews/itinerary/${itineraryId}`),
  getByUserId: (userId) => axios.get(`${API_BASE_URL}/reviews/user/${userId}`),
  create: (review) => axios.post(`${API_BASE_URL}/reviews`, review),
  update: (id, review) => axios.put(`${API_BASE_URL}/reviews/${id}`, review),
  delete: (id) => axios.delete(`${API_BASE_URL}/reviews/${id}`),
};

// Exports all API objects for use throughout the frontend components
export { cityAPI, attractionAPI, authAPI, itineraryAPI, reviewAPI };
