const eventsDB = require('../model/eventsSchema')
const UsersDB = require("../model/UserSchema");
const ticketsDB = require("../model/ticketsSchema");


function getEventsOfUser(user) {
  return UsersDB.find({_id : user.id}).select('eventsArr').populate('eventsArr')
  .then(events => {
  return events[0]?.eventsArr
  })
}
function getTicketsOfEvent(id) {
  return eventsDB.find({_id : id}).select('ticketsList').populate('ticketsList')
  .then(tickets => {
    return tickets[0].ticketsList
  })
}

function ifTicketIsExists(eventID , ticketID){
 return ticketsDB.findById(ticketID).then(result =>{
    if(result.event == eventID){
      return true
    }
  })
}

function updateScannedTicket(ticketId) {
 return ticketsDB.findById(ticketId).then(function (ticket) {
    if (ticket.isScanned === true) {
      return false;
    }
   return ticketsDB.findByIdAndUpdate(ticketId, { isScanned: true }).then(resul =>{
      return true;
    })
  })
}
      

module.exports = {getEventsOfUser , getTicketsOfEvent , ifTicketIsExists, updateScannedTicket};