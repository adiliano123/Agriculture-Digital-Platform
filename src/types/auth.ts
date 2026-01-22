export interface User {
  id: number;
  first_name: string;
  last_name: string;
  full_name?: string;
  email: string;
  phone?: string;
  user_type: 'farmer' | 'extension_officer' | 'agri_dealer' | 'agri_company';
  status: 'active' | 'inactive' | 'suspended';
  region?: string;
  district?: string;
  ward?: string;
  profile_image?: string;
  last_login_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (userData: User, token: string) => void;
  logout: () => Promise<void>;
  loading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  password_confirmation: string;
  userType: 'farmer' | 'extension_officer' | 'agri_dealer' | 'agri_company';
  region?: string;
  district?: string;
  ward?: string;
}
