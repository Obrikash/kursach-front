import axios from 'axios';
import type { RegisterRequest, UserResponse, ApiErrorResponse, LoginRequest, LoginResponse, PoolsResponse, TrainersResponse, PoolTrainersResponse } from '../types/api';

const API_URL = 'http://localhost:4000/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/tokens/authentication', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw error.response.data as ApiErrorResponse;
    }
    throw error;
  }
};

export const getPools = async (): Promise<PoolsResponse> => {
  try {
    const response = await api.get<PoolsResponse>('/pools');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw error.response.data as ApiErrorResponse;
    }
    throw error;
  }
};

export const getTrainers = async (): Promise<TrainersResponse> => {
  try {
    const response = await api.get<TrainersResponse>('/users/trainers');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw error.response.data as ApiErrorResponse;
    }
    throw error;
  }
};

export const getPoolTrainers = async (): Promise<PoolTrainersResponse> => {
  try {
    const response = await api.get<PoolTrainersResponse>('/pools/trainers');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw error.response.data as ApiErrorResponse;
    }
    throw error;
  }
}; 