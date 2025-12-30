import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/" className="logo">
          Mini Event Platform
        </Link>
      </div>
      <div className="nav-right">
        <Link to="/events" className="nav-link">
          Events
        </Link>
        {user && (
          <>
            <Link to="/events/new" className="nav-link">
              Create Event
            </Link>
            <Link to="/my-events" className="nav-link">
              My Events
            </Link>
          </>
        )}
        {!user ? (
          <>
            <Link to="/login" className="nav-button secondary">
              Login
            </Link>
            <Link to="/register" className="nav-button primary">
              Sign Up
            </Link>
          </>
        ) : (
          <button type="button" className="nav-button secondary" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


