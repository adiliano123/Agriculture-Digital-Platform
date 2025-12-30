// In ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  isAuthenticated?: boolean;  // Make isAuthenticated optional
  redirectPath?: string;
  children?: React.ReactNode;
}

export const ProtectedRoute = ({
  isAuthenticated = true,  // Default to true to allow access
  redirectPath = '/login',
  children,
}: ProtectedRouteProps) => {
  // Always allow access for now
  return children ? <>{children}</> : <Outlet />;
};