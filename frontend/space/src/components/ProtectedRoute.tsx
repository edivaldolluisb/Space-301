import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { auth } from "@/lib/axios"; 

interface ProtectedRouteProps {
  allowedRoles?: string[]; 
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  allowedRoles = ['ADMIN', 'USER'] 
}) => {
  const { authenticated, role } = auth.isAuthenticated();

  if (!authenticated) {
    
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role || 'VISITOR')) {
    
    return <Navigate to="/dashboard" replace />;
  }

  
  return <Outlet />;
};