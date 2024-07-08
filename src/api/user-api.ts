import { User } from '@/contexts/user-context';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/users'; 

const userApi = {
  get: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },

  create: async (data: User) => {
    try {
      const response = await axios.post(`${API_BASE_URL}`, data);
      return response.data;
    } catch (error) {
      console.error('Error create data:', error);
      throw error;
    }
  },

  update: async (id: string, data: User) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating data:', error);
      throw error;
    }
  },
  
  delete: async (id: string) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting data:', error);
      throw error;
    }
  }
};

export default userApi;
