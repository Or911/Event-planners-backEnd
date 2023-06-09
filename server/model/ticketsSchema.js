const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ticketsSchema = new schema({
  event: { type: schema.Types.ObjectId, ref: "events" },
  price: { type: Number, required: true },
  isScanned: { type: Boolean, default: false },
  qrCode : String
});

const ticket = mongoose.model("ticket", ticketsSchema);
module.exports = ticket;
