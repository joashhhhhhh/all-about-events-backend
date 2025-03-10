const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  amount: { type: Number, required: true },
  vendorCut: { type: Number, required: true },
  adminCut: { type: Number, required: true },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", paymentSchema);
