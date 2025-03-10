const express = require("express");
const router = express.Router();
const { getClients, registerClient, loginClient, getClientById } = require("../controllers/clientController");

router.get("/", getClients);


router.post("/register", registerClient);


router.post("/login", loginClient);


router.get("/:id", getClientById);

module.exports = router;

