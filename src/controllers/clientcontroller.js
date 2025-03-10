const Client = require("../../src/models/clients");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};


exports.registerClient = async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  
  try {
    let client = await Client.findOne({ email });
    if (client) {
      return res.status(400).json({ msg: "Client already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    client = new Client({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    await client.save();

    res.status(201).json({ msg: "Client registered successfully", client });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};


exports.loginClient = async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: client._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ msg: "Login successful", token, client });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};


exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ msg: "Client not found" });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

  