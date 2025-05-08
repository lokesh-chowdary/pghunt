import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token"); // Check for the authentication token
  if (!token) {
    // Redirect to login if the token is missing
    return <Navigate to="/login" replace />;
  }
  return children; // Render the protected content if the token exists
};

export default ProtectedRoute;