import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const { isAuthenticated, children } = props;
  if (!isAuthenticated) {
    return <Navigate to={'/login'} />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
