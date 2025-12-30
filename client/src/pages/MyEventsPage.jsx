import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";
import { createApiClient } from "../api/client.js";

const MyEventsPage = () => {
  const { token } = useAuth();
  const api = createApiClient(() => token);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMine = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/events/me/mine");
        res.data.sort(
          (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
        );
        setEvents(res.data);
      } catch (err) {
        setError("Failed to load your events");
      } finally {
        setLoading(false);
      }
    };
    fetchMine();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>My Events</h1>
          <p className="muted">Events you have created.</p>
        </div>
        <Link to="/events/new" className="btn primary">
          Create Event
        </Link>
      </header>
      {error && <div className="alert error">{error}</div>}
      {loading ? (
        <div className="center-text">Loading...</div>
      ) : events.length === 0 ? (
        <div className="center-text muted">
          You haven&apos;t created any events yet.{" "}
          <Link to="/events/new">Create your first event</Link>.
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Location</th>
              <th>Attendees</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e._id}>
                <td>{e.title}</td>
                <td>{new Date(e.dateTime).toLocaleString()}</td>
                <td>{e.location}</td>
                <td>
                  {e.attendees?.length || 0}/{e.capacity}
                </td>
                <td className="table-actions">
                  <Link to={`/events/${e._id}`} className="small-link">
                    View
                  </Link>
                  <Link to={`/events/${e._id}/edit`} className="small-link">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyEventsPage;


