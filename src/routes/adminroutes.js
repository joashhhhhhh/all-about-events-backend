const express = require("express");
const router = express.Router();
const { getAdminDashboard } = require("../controllers/admincontroller");

router.get("/", getAdminDashboard);

module.exports = router;
