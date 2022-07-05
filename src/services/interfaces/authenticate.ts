import { User } from "./user";

export interface AuthContextProps {
  user: User;
  isAuthenticated: boolean;
  signIn: (data: SignInData) => void;
}

export interface SignInData {
  email: string;
  password: string;
}