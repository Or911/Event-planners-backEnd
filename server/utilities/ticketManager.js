const ticketsDB = require("../model/ticketsSchema");
const eventsDB = require("../model/eventsSchema");
const UsersDB = require("../model/UserSchema");

function addTicket(user, eventId, eventPrice) {
  return getEventByID(eventId).then((event) => {
    let ticket = new ticketsDB({
        event : event,
        price : eventPrice
    });
    ticket.save().then(()=>{
        return addTicketToUser(user.id, ticket.id);
    });
  });
}

function addTicketToUser(userID, listID) {
  return UsersDB.findByIdAndUpdate(userID, { $push: { ticketsArr: listID } });
}

function getTickets(user , eventName) {
  if (eventName !== undefined) {
    return ticketsDB.find({ name: eventName }).populate('events');
  }
  return UsersDB.find({username : user.username}).select('ticketsArr').populate({
    path: 'ticketsArr',
    populate: {
      path: 'event'
    }
  })
}

function getEventByID(id) {
  return eventsDB.findById(id);
}

module.exports = { addTicket, getTickets };

