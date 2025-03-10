const Event = require("../models/events");

const addEvent= async (req, res) => {
  const { title, description, date, location, price } = req.body;

  try {
    const existingEvent = await Event.findOne({ title });
    if (existingEvent) {
      return res.status(400).json({ msg: "Event with this title already exists" });
    }

    const event = new Event({ title, description, date, location, price });
    await event.save();
    res.status(201).json({ msg: "Event added successfully", event });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};


const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    res.status(200).json({ msg: "Event updated successfully", event });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    res.status(200).json({ msg: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};


const testEvent = (req, res) => {
  res.send("✅ Event controller is working!");
};


module.exports = { addEvent, getEvents, updateEvent, deleteEvent, testEvent };
