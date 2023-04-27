const events = require('../model/eventsSchema');
const eventsDB = require('../model/eventsSchema')
const UsersDB = require("../model/UserSchema");
const ticketsDB = require("../model/ticketsSchema");


function getEventsOfUser(user) {
  return UsersDB.find({_id : user.id}).select('eventsArr').populate('eventsArr')
  .then(events => {
  return events[0].eventsArr
  })
}
function getTicketsOfEvent(id) {
  return eventsDB.find({_id : id}).select('ticketsList').populate('ticketsList')
  .then(tickets => {
    return tickets[0].ticketsList
  })
}


function updateScannedTicket(ticketId) {
  ticketsDB.findById(ticketId).then(function (ticket) {
    if (ticket.isScanned) {
      return true;
    }

    ticketsDB.findByIdAndUpdate(ticketId, { isScanned: true });
    return false;
  });
}
      

module.exports = {getEventsOfUser , getTicketsOfEvent , updateScannedTicket};