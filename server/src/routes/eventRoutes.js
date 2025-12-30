import express from "express";
import Event from "../models/Event.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Public: list events with basic optional filters
router.get("/", async (req, res) => {
  try {
    const { search, category } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } }
      ];
    }

    if (category) {
      query.category = category;
    }

    const events = await Event.find(query)
      .populate("createdBy", "name email")
      .sort({ dateTime: 1 });

    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Public: get single event
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("createdBy", "name email");
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Auth: create event
router.post("/", protect, async (req, res) => {
  try {
    const { title, description, dateTime, location, capacity, category, imageUrl } = req.body;

    const event = await Event.create({
      title,
      description,
      dateTime,
      location,
      capacity,
      category,
      imageUrl,
      createdBy: req.user._id
    });

    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Auth: get events created by logged-in user
router.get("/me/mine", protect, async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user._id }).sort({ dateTime: 1 });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Auth: update event (only if owner)
router.put("/:id", protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed to edit this event" });
    }

    const { title, description, dateTime, location, capacity, category, imageUrl } = req.body;
    event.title = title;
    event.description = description;
    event.dateTime = dateTime;
    event.location = location;
    event.capacity = capacity;
    event.category = category;
    event.imageUrl = imageUrl;

    const updated = await event.save();
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Auth: delete event (only if owner)
router.delete("/:id", protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed to delete this event" });
    }

    await event.deleteOne();
    res.json({ message: "Event removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Auth: RSVP to event
router.post("/:id/rsvp", protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const already = event.attendees.find(
      (a) => a.user.toString() === req.user._id.toString()
    );
    if (already) {
      return res.status(400).json({ message: "You have already RSVP'd to this event" });
    }

    if (event.attendees.length >= event.capacity) {
      return res.status(400).json({ message: "Event is at full capacity" });
    }

    event.attendees.push({ user: req.user._id });
    await event.save();

    res.json({ message: "RSVP successful", attendeesCount: event.attendees.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;


