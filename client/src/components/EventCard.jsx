import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  const attendeesCount = event.attendees?.length || 0;

  return (
    <div className="card">
      {event.imageUrl && (
        <div className="card-image">
          <img src={event.imageUrl} alt={event.title} />
        </div>
      )}
      <div className="card-body">
        <h3>{event.title}</h3>
        <p className="muted">{new Date(event.dateTime).toLocaleString()}</p>
        <p className="muted">{event.location}</p>
        <p className="muted">
          {attendeesCount}/{event.capacity} attending
        </p>
        <p className="description">{event.description.slice(0, 120)}...</p>
        <div className="card-footer">
          <Link to={`/events/${event._id}`} className="btn primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;


