import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Dashboard from "./pages/Dashboard";
import Hero from "./components/Hero";
import Shuffle from "./components/Shuffle";
import Profile from "./components/Profile";
import Footer from "./common/Footer";
import Player from "./components/Player";

import { useAuth } from "./contexts/AuthContext";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-between">
        <div className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                !isAuthenticated ? <Register /> : <Navigate to="/dashboard" />
              }
            />
            <Route path="/player" element={<Player />} />
            <Route
              path="/login"
              element={
                !isAuthenticated ? <Login /> : <Navigate to="/dashboard" />
              }
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/hero"
              element={isAuthenticated ? <Hero /> : <Navigate to="/login" />}
            />
            <Route
              path="/Shuffle"
              element={isAuthenticated ? <Shuffle /> : <Navigate to="/login" />}
            />
            <Route
              path="/Profile"
              element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
};

export default App;
