import { Role } from '../constants/roles';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  user: Omit<User, 'password'>;
  token: string;
}

export interface JWTPayload {
  userId: string;
  role: Role;
}
