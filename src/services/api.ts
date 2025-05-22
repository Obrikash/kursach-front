import axios from 'axios';
import type { RegisterRequest, UserResponse, ApiErrorResponse } from '../types/api';

const API_URL = 'http://localhost:4000/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = async (data: RegisterRequest): Promise<UserResponse> => {
  try {
    const response = await api.post<UserResponse>('/users', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw error.response.data as ApiErrorResponse;
    }
    throw error;
  }
}; 