import React, { useState } from "react";

const initialForm = {
  title: "",
  description: "",
  dateTime: "",
  location: "",
  capacity: 10,
  category: "",
  imageUrl: ""
};

const EventForm = ({ onSubmit, submitting, initialValues }) => {
  const [form, setForm] = useState(initialValues || initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          placeholder="React Meetup"
        />
      </div>
      <div className="form-row">
        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Short description..."
        />
      </div>
      <div className="form-grid">
        <div className="form-row">
          <label>Date & Time</label>
          <input
            type="datetime-local"
            name="dateTime"
            value={form.dateTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label>Capacity</label>
          <input
            type="number"
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
            min={1}
            required
          />
        </div>
      </div>
      <div className="form-grid">
        <div className="form-row">
          <label>Location</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            placeholder="Online / City"
          />
        </div>
        <div className="form-row">
          <label>Category</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Tech, Music..."
          />
        </div>
      </div>
      <div className="form-row">
        <label>Image URL (optional)</label>
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="https://images..."
        />
      </div>
      <button type="submit" className="btn primary" disabled={submitting}>
        {submitting ? "Saving..." : "Save Event"}
      </button>
    </form>
  );
};

export default EventForm;


