const express = require("express");
const router = express.Router();
const { register, login, logout, getUserByToken } = require("../controllers/authcontrollers");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", getUserByToken);

module.exports = router;
