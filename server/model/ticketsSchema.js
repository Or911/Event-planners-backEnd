const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ticketsSchema = new schema({
  event: { type: schema.Types.ObjectId, ref: "events" },
  price: Number,
});

const ticket = mongoose.model("ticket", ticketsSchema);
module.exports = ticket;
