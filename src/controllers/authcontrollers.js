const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({ ...req.body, password: hashedPassword, role });

    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};


const logout = async (req, res) => {
  res.json({ msg: "Logout successful" });
};


const getUserByToken = async (req, res) => {
  try {
      if (!req.user) {
          return res.status(401).json({ msg: "Unauthorized access" });
      }
      const user = await User.findById(req.user.id).select("-password");
      if (!user) {
          return res.status(404).json({ msg: "User not found" });
      }
      res.json(user);
  } catch (error) {
      console.error("Error in getUserByToken:", error);
      res.status(500).json({ msg: "Server error" });
  }
};



module.exports = { register, login, logout, getUserByToken };


