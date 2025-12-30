import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard.jsx";
import { createApiClient } from "../api/client.js";
import { useAuth } from "../state/AuthContext.jsx";

const EventsListPage = () => {
  const { token } = useAuth();
  const api = createApiClient(() => token);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const fetchEvents = async () => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (search) params.search = search;
      const res = await api.get("/events", { params });
      setEvents(res.data);
    } catch (err) {
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchEvents();
  };

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Upcoming Events</h1>
          <p className="muted">Discover and RSVP to events created by the community.</p>
        </div>
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            placeholder="Search by title or location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn secondary" type="submit">
            Search
          </button>
        </form>
      </header>
      {error && <div className="alert error">{error}</div>}
      {loading ? (
        <div className="center-text">Loading events...</div>
      ) : events.length === 0 ? (
        <div className="center-text muted">No events found.</div>
      ) : (
        <div className="grid">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsListPage;


