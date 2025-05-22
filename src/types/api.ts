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

export interface PoolTrainers {
  pool: Pool;
  trainers: User[];
}

export interface PoolTrainersResponse {
  trainers_for_pools: PoolTrainers[];
}

export interface TrainerProfit {
  id: number;
  full_name: string;
  pool_id: number;
  pool_name: string;
  profit: number;
}

export interface TrainerProfitsResponse {
  profits: TrainerProfit[];
}

export interface PoolProfit {
  pool: Pool;
  profit: number;
}

export interface PoolProfitResponse {
  pool: PoolProfit;
}

export interface AttachTrainerRequest {
  user_id: number;
  pool_id: number;
}

export interface AttachTrainerResponse {
  success: string;
}

export interface Subscription {
  id: number;
  name: string;
  visits_per_week: number;
  price: number;
}

export interface SubscriptionsResponse {
  subscriptions: Subscription[];
}

export interface CreateGroupRequest {
  pool_id: number;
  category_id: number;
  trainer_id: number;
}

export interface CreateGroupResponse {
  success: string;
}

export interface Group {
  id: number;
  category: string;
  pool_name: string;
  trainer_name: string;
  user_id: number;
  image: string;
}

export interface GroupsResponse {
  groups: Group[];
}

export interface UserSubscription {
  user_id: number;
  full_name: string;
  sub_id: number;
  sub_name: string;
  visits_per_week: number;
  price: number;
  date_start: string;
  date_end: string;
}

export interface UserSubscriptionsResponse {
  user_subscriptions: UserSubscription[];
} 