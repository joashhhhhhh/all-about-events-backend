const express = require("express");
const router = express.Router();
const { processPayment, getClientPayments, getEventPayments } = require("../controllers/paymentcontroller");

router.post("/process", processPayment); 
router.get("/:clientId", getClientPayments); 
router.get("/event/:eventId", getEventPayments); 

module.exports = router;
