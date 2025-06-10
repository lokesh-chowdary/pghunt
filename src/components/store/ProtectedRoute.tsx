import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "./authStore";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, token } = useAuthStore();
  
  if (!isAuthenticated || !token) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  return children; // Render the protected content if authenticated
};

export default ProtectedRoute;