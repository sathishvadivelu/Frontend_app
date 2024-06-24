import axios from 'axios';
import showToast from '../components/ToastComponent';

// Set your API base URL
const API_BASE_URL = 'http://192.168.137.1:3000';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Timeout after 10 seconds
});

export const getAllCustomers = async endpoint => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    showToast('error', 'Error', 'Error fetching customers.');
    throw error; // Re-throw the error so components can handle it
  }
};

export const fetchData = async (endpoint, params) => {
  try {
    const response = await axiosInstance.get(endpoint, {params});
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    showToast('error', 'Error', 'Error fetching data.');
    throw error; // Re-throw the error so components can handle it
  }
};

export const postData = async (endpoint, data) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    showToast('success', 'Success', 'Data posted successfully.');
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    showToast('error', 'Error', 'Error posting data.');
    throw error; // Re-throw the error so components can handle it
  }
};

export const updateData = async (endpoint, data) => {
  try {
    const response = await axiosInstance.put(endpoint, data);
    showToast('success', 'Success', 'Data updated successfully.');
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    showToast('error', 'Error', 'Error updating data.');
    throw error;
  }
};

export const deleteData = async (endpoint, params) => {
  try {
    const response = await axiosInstance.delete(endpoint, {params});
    showToast('success', 'Success', 'Data deleted successfully.');
    return response.data;
  } catch (error) {
    console.error('Error deleting data:', error);
    showToast('error', 'Error', 'Error deleting data.');
    throw error;
  }
};
