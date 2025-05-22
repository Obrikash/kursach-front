import axios from 'axios';
import type { RegisterRequest, UserResponse, ApiErrorResponse, LoginRequest, LoginResponse, PoolsResponse, TrainersResponse, PoolTrainersResponse, TrainerProfitsResponse, PoolProfitResponse, AttachTrainerRequest, AttachTrainerResponse, SubscriptionsResponse, CreateGroupRequest, CreateGroupResponse, GroupsResponse } from '../types/api';

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

export const getUserProfile = async (): Promise<UserResponse> => {
  try {
    const response = await api.get<UserResponse>('/users');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw error.response.data as ApiErrorResponse;
    }
    throw error;
  }
};

export const getTrainerProfits = async (): Promise<TrainerProfitsResponse> => {
  try {
    const response = await api.get<TrainerProfitsResponse>('/users/trainers/profit');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw error.response.data as ApiErrorResponse;
    }
    throw error;
  }
};

export const getPoolProfit = async (): Promise<PoolProfitResponse> => {
  try {
    const response = await api.get<PoolProfitResponse>('/pool');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw error.response.data as ApiErrorResponse;
    }
    throw error;
  }
};

export const attachTrainerToPool = async (data: AttachTrainerRequest): Promise<AttachTrainerResponse> => {
  try {
    const response = await api.post<AttachTrainerResponse>('/pools/trainers', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw error.response.data as ApiErrorResponse;
    }
    throw error;
  }
};

export const getSubscriptions = async (): Promise<SubscriptionsResponse> => {
  try {
    const response = await api.get<SubscriptionsResponse>('/subscriptions');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw error.response.data as ApiErrorResponse;
    }
    throw error;
  }
};

export const createGroup = async (data: CreateGroupRequest): Promise<CreateGroupResponse> => {
  try {
    const response = await api.post<CreateGroupResponse>('/groups', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw error.response.data as ApiErrorResponse;
    }
    throw error;
  }
};

export const getGroups = async (): Promise<GroupsResponse> => {
  try {
    const response = await api.get<GroupsResponse>('/groups');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw error.response.data as ApiErrorResponse;
    }
    throw error;
  }
}; 