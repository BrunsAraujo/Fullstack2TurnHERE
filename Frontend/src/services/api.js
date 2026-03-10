import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/admin";

const cityAPI = {
  getAll: () => axios.get(`${API_BASE_URL}/cities`),
  getById: (id) => axios.get(`${API_BASE_URL}/cities/${id}`),
  create: (city) => axios.post(`${API_BASE_URL}/cities`, city),
  update: (id, city) => axios.put(`${API_BASE_URL}/cities/${id}`, city),
  delete: (id) => axios.delete(`${API_BASE_URL}/cities/${id}`),
};

const attractionAPI = {
  getAll: () => axios.get(`${API_BASE_URL}/attractions`),
  getById: (id) => axios.get(`${API_BASE_URL}/attractions/${id}`),
  create: (attraction) => axios.post(`${API_BASE_URL}/attractions`, attraction),
  update: (id, attraction) =>
    axios.put(`${API_BASE_URL}/attractions/${id}`, attraction), // ✅ ADDED THIS LINE
  delete: (id) => axios.delete(`${API_BASE_URL}/attractions/${id}`),
};

export { cityAPI, attractionAPI };
