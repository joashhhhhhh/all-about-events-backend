const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventcontrollers");
const authMiddleware = require("../middleware/authmiddleware");

router.post("/add", authMiddleware, eventController.addEvent);
router.put("/update/:id", authMiddleware, eventController.updateEvent);
router.delete("/delete/:id", authMiddleware, eventController.deleteEvent);
router.get("/", eventController.getEvents);

module.exports = router;
