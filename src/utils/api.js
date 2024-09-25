import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchUsers = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};