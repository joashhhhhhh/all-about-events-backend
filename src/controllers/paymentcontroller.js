const Payment = require("../models/payments");
const Event = require("../models/events");
const Client = require("../models/clients");

const processPayment = async (req, res) => {
    try {
      const { clientId, eventId, amount } = req.body;
  
      if (!clientId || !eventId || !amount) {
        return res.status(400).json({ msg: "Missing required fields" });
      }
  
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ msg: "Event not found" });
      }
  
      const client = await Client.findById(clientId);
      if (!client) {
        return res.status(404).json({ msg: "Client not found" });
      }
  
      if (client.walletBalance < amount) {
        return res.status(400).json({ msg: "Insufficient balance" });
      }
  

    
    client.walletBalance -= amount;

    
    const vendorCut = parseFloat((amount * 0.8).toFixed(2));
    const adminCut = parseFloat((amount * 0.2).toFixed(2));

    
    const payment = new Payment({
      client: clientId,
      event: eventId,
      amount,
      vendorCut,
      adminCut,
      status: "completed",
    });

    await payment.save();

    
    client.bookings.push({
      event: eventId,
      amountPaid: amount,
      paymentStatus: "completed",
    });

    
    client.payments.push(payment._id);
    await client.save();

    res.status(201).json({ msg: "Payment processed successfully", payment });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ msg: "Server error" });
  }
};


const getClientPayments = async (req, res) => {
  try {
    const { clientId } = req.params;
    const payments = await Payment.find({ client: clientId }).populate("event");
    res.json(payments);
  } catch (error) {
    console.error("Error fetching client payments:", error);
    res.status(500).json({ msg: "Server error" });
  }
};


const getEventPayments = async (req, res) => {
  try {
    const { eventId } = req.params;
    const payments = await Payment.find({ event: eventId }).populate("client");
    res.json(payments);
  } catch (error) {
    console.error("Error fetching event payments:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { processPayment, getClientPayments, getEventPayments };
