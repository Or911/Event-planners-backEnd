const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ticketsSchema = new schema({
    name:{ type: String, required: true },

})


const ticket = mongoose.model('ticket', ticketsSchema);
module.exports = ticket;


