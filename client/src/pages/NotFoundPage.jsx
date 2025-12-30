import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div className="page">
    <div className="center-text">
      <h1>404</h1>
      <p className="muted">The page you are looking for does not exist.</p>
      <Link to="/events" className="btn primary">
        Go to Events
      </Link>
    </div>
  </div>
);

export default NotFoundPage;


