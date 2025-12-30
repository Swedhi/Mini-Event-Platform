import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";
import { createApiClient } from "../api/client.js";
import EventForm from "../components/EventForm.jsx";

const CreateEventPage = () => {
  const { token } = useAuth();
  const api = createApiClient(() => token);
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (form) => {
    setSubmitting(true);
    setError("");
    try {
      const res = await api.post("/events", form);
      navigate(`/events/${res.data._id}`);
    } catch (err) {
      setError("Failed to create event");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Create Event</h1>
          <p className="muted">Share your event with the community.</p>
        </div>
      </header>
      {error && <div className="alert error">{error}</div>}
      <EventForm onSubmit={handleSubmit} submitting={submitting} />
    </div>
  );
};

export default CreateEventPage;


