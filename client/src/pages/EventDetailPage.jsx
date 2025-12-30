import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";
import { createApiClient } from "../api/client.js";

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const api = createApiClient(() => token);

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [error, setError] = useState("");

  const isOwner = user && event && event.createdBy && event.createdBy._id === user.id;

  const fetchEvent = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get(`/events/${id}`);
      setEvent(res.data);
    } catch (err) {
      setError("Failed to load event");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleRsvp = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setRsvpLoading(true);
    setError("");
    try {
      await api.post(`/events/${id}/rsvp`);
      await fetchEvent();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to RSVP");
    } finally {
      setRsvpLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await api.delete(`/events/${id}`);
      navigate("/events");
    } catch (err) {
      setError("Failed to delete event");
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="center-text">Loading event...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="page">
        <div className="center-text">Event not found.</div>
      </div>
    );
  }

  const attendeesCount = event.attendees?.length || 0;

  return (
    <div className="page">
      {error && <div className="alert error">{error}</div>}
      <div className="event-detail">
        {event.imageUrl && (
          <div className="event-image">
            <img src={event.imageUrl} alt={event.title} />
          </div>
        )}
        <div className="event-main">
          <h1>{event.title}</h1>
          <p className="muted">
            {new Date(event.dateTime).toLocaleString()} • {event.location}
          </p>
          {event.category && <p className="tag">{event.category}</p>}
          <p className="description">{event.description}</p>
          <p className="muted">
            Capacity: {attendeesCount}/{event.capacity} attending
          </p>
          {event.createdBy && (
            <p className="muted">Host: {event.createdBy.name || event.createdBy.email}</p>
          )}
          <div className="actions-row">
            <button
              type="button"
              className="btn primary"
              onClick={handleRsvp}
              disabled={rsvpLoading}
            >
              {rsvpLoading ? "Submitting..." : "RSVP"}
            </button>
            <Link to="/events" className="btn secondary">
              Back to Events
            </Link>
            {isOwner && (
              <>
                <Link to={`/events/${event._id}/edit`} className="btn secondary">
                  Edit
                </Link>
                <button type="button" className="btn danger" onClick={handleDelete}>
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;


