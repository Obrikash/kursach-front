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