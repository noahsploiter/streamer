import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Admin from "./Admin";

const Dashboard = () => {
  const { userData, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (userData.role !== "admin") {
    return <Navigate to="/hero" />;
  }

  return <Admin />;
};

export default Dashboard;
