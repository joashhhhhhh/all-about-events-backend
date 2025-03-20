const express = require("express");
const { authMiddleware, checkRole } = require("../middleware/authmiddleware");
const { addShow, deleteShow, getVendorDashboard } = require("../");

const router = express.Router();

// Vendor Dashboard (Protected)
router.get("/dashboard", authMiddleware, checkRole(["vendor"]), getVendorDashboard);

// Add Show (Protected)
router.post("/shows", authMiddleware, checkRole(["vendor"]), addShow);

// Delete Show (Protected)
router.delete("/shows/:id", authMiddleware, checkRole(["vendor"]), deleteShow);

module.exports = router;
