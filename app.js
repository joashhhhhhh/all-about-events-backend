const express = require("express");
const connectDB = require("./src/config/db");
require("dotenv").config();
const cors = require("cors");
const { getAdminDashboard } = require("./src/controllers/admincontroller");


const app = express();


connectDB();


app.use(express.json());
app.use(cors());


app.use("/api/auth", require("./src/routes/authroutes"));
app.use("/api/events", require("./src/routes/eventroutes"));
app.use("/api/clients", require("./src/routes/clientroutes"));  
app.use("/api/admin", require("./src/routes/adminroutes"));
app.use("/api/payments", require("./src/routes/paymentroutes"));


const PORT = process.env.PORT || 6001;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
