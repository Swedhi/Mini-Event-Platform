import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";
import { createApiClient } from "../api/client.js";
import EventForm from "../components/EventForm.jsx";

const EditEventPage = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const api = createApiClient(() => token);
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get(`/events/${id}`);
        const e = res.data;
        setInitialValues({
          title: e.title,
          description: e.description,
          dateTime: e.dateTime.slice(0, 16),
          location: e.location,
          capacity: e.capacity,
          category: e.category || "",
          imageUrl: e.imageUrl || ""
        });
      } catch (err) {
        setError("Failed to load event");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async (form) => {
    setSubmitting(true);
    setError("");
    try {
      await api.put(`/events/${id}`, form);
      navigate(`/events/${id}`);
    } catch (err) {
      setError("Failed to update event");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="center-text">Loading...</div>
      </div>
    );
  }

  if (!initialValues) {
    return (
      <div className="page">
        <div className="center-text">Event not found</div>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Edit Event</h1>
          <p className="muted">Update details for your event.</p>
        </div>
      </header>
      {error && <div className="alert error">{error}</div>}
      <EventForm
        onSubmit={handleSubmit}
        submitting={submitting}
        initialValues={initialValues}
      />
    </div>
  );
};

export default EditEventPage;


