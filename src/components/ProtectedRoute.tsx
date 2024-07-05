import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const userDetails = localStorage.getItem('userDetails');

  if (!userDetails) {
    alert('Please enter your details before accessing this page.');
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
