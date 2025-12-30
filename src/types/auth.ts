export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  // Add any other user properties you need
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}
