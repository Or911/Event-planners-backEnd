const events = require('../model/eventsSchema');
const eventsDB = require('../model/eventsSchema')
const UsersDB = require("../model/UserSchema");


function getEventsOfUser(user) {
  return UsersDB.find({_id : user.id}).select('eventsArr').populate('eventsArr')
  .then(events => {
  return events[0].eventsArr
  })
}

        

      

    module.exports = {getEventsOfUser};