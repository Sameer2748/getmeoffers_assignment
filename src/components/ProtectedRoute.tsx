import React from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const Navigate = useNavigate();
    const userDetails = localStorage.getItem('userDetails');

    if (!userDetails) {
      alert('Please enter your details before accessing this page.');
      return Navigate('/');
    }
    return <>{children}</>;
  };