const ticketsDB = require("../model/ticketsSchema");
const eventsDB = require("../model/eventsSchema");
const UsersDB = require("../model/UserSchema");

function addTicket(user, eventId, eventPrice) {
  return getEventByID(eventId).then((event) => {
    let ticket = new ticketsDB({
      event: event,
      price: eventPrice,
    });
    ticket.qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticket.id}`
    ticket.save().then(() => {
      return addTicketToEvent(eventId, ticket.id).then(()=>{
        return addTicketToUser(user.id, ticket.id);
      })
    });
  });
}

function addTicketToUser(userId, listId) {
  return UsersDB.findByIdAndUpdate(userId, { $push: { ticketsArr: listId } });
}
function addTicketToEvent(eventId, ticketId) {
  return eventsDB.findByIdAndUpdate(eventId, {$push: { ticketsList: ticketId },});
}

function getTickets(user, eventName) {
  if (eventName !== undefined) {
    return ticketsDB.find({ name: eventName }).populate("events");
  }
  return UsersDB.find({ username: user.username })
    .select("ticketsArr")
    .populate({
      path: "ticketsArr",
      populate: {
        path: "event",
      },
    });
}

function getEventByID(id) {
  return eventsDB.findById(id);
}

function getTicketByID(id) {
  return ticketsDB.findById(id);
}

function updateScannedTicket(ticketId) {
  getTicketByID(ticketId).then(function (ticket) {
    if (ticket.isScanned) {
      return true;
    }

    ticketsDB.findByIdAndUpdate(ticketId, { isScanned: true });
    return false;
  });
}

module.exports = { addTicket, getTickets, updateScannedTicket };
