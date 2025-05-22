export interface User {
  id: number;
  created_at: string;
  full_name: string;
  email: string;
  role_id: number;
  image_url: string;
}

export interface UserResponse {
  user: User;
}

export interface RegisterRequest {
  full_name: string;
  email: string;
  password: string;
  role: number;
}

export interface ApiErrorResponse {
  error: {
    [key: string]: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  authentication_token: string;
}

export interface Pool {
  id: number;
  name: string;
  address: string;
  type: string;
}

export interface PoolsResponse {
  pools: Pool[];
}

export interface TrainersResponse {
  trainers: User[];
} 