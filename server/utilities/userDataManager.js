const events = require('../model/eventsSchema');
const eventsDB = require('../model/eventsSchema')
const UsersDB = require("../model/UserSchema");


function getEventsOfUser(user) {
  return UsersDB.find({_id : user.id}).select('eventsArr').populate('eventsArr')
  .then(events => {
  return events[0].eventsArr
  })
}
function getTicketsOfEvent(id) {
  return eventsDB.find({_id : id}).select('ticketsList').populate('ticketsList')
  .then(tickets => {
    console.log(tickets[0]);
    return tickets[0]
  })
}
        

      

    module.exports = {getEventsOfUser , getTicketsOfEvent};