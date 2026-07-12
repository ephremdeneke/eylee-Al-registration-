import axios from 'axios';

// Get Google Apps Script URL from environment variables
const API_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

if (!API_URL) {
  console.warn("VITE_APPS_SCRIPT_URL is not set in your .env file! Please specify the URL to connect to Google Sheets.");
}

export const apiService = {
  // Submit a new registration
  // We use Content-Type 'text/plain' and serialize JSON to avoid triggering a CORS preflight OPTIONS request
  submitRegistration: async (formData) => {
    if (!API_URL) throw new Error("API URL is not configured. Please add VITE_APPS_SCRIPT_URL in your .env file.");
    
    try {
      const response = await axios.post(API_URL, JSON.stringify(formData), {
        headers: { 'Content-Type': 'text/plain' }
      });
      if (response.data && response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data?.error || "Failed to submit registration.");
      }
    } catch (err) {
      throw new Error(err.response?.data?.error || err.message || "Failed to communicate with the Sheets API.");
    }
  },

  // Get all registrations
  listRegistrations: async () => {
    if (!API_URL) throw new Error("API URL is not configured. Please add VITE_APPS_SCRIPT_URL in your .env file.");

    try {
      const response = await axios.get(`${API_URL}?action=list`);
      if (response.data && response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data?.error || "Failed to fetch registrations.");
      }
    } catch (err) {
      throw new Error(err.response?.data?.error || err.message || "Failed to communicate with the Sheets API.");
    }
  },

  // Get single participant details
  getRegistration: async (id) => {
    if (!API_URL) throw new Error("API URL is not configured. Please add VITE_APPS_SCRIPT_URL in your .env file.");

    try {
      const response = await axios.get(`${API_URL}?action=get&id=${id}`);
      if (response.data && response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data?.error || "Failed to fetch participant details.");
      }
    } catch (err) {
      throw new Error(err.response?.data?.error || err.message || "Failed to communicate with the Sheets API.");
    }
  },

  // Update participant details
  // We use Content-Type 'text/plain' and serialize JSON to avoid CORS preflight OPTIONS block
  updateRegistration: async (updateData) => {
    if (!API_URL) throw new Error("API URL is not configured. Please add VITE_APPS_SCRIPT_URL in your .env file.");

    try {
      const response = await axios.post(`${API_URL}?action=update`, JSON.stringify(updateData), {
        headers: { 'Content-Type': 'text/plain' }
      });
      if (response.data && response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data?.error || "Failed to update participant.");
      }
    } catch (err) {
      throw new Error(err.response?.data?.error || err.message || "Failed to communicate with the Sheets API.");
    }
  },

  // Delete participant
  // We use Content-Type 'text/plain' and serialize JSON to avoid CORS preflight OPTIONS block
  deleteRegistration: async (id) => {
    if (!API_URL) throw new Error("API URL is not configured. Please add VITE_APPS_SCRIPT_URL in your .env file.");

    try {
      const response = await axios.post(`${API_URL}?action=delete`, JSON.stringify({ id }), {
        headers: { 'Content-Type': 'text/plain' }
      });
      if (response.data && response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data?.error || "Failed to delete participant.");
      }
    } catch (err) {
      throw new Error(err.response?.data?.error || err.message || "Failed to communicate with the Sheets API.");
    }
  }
};
