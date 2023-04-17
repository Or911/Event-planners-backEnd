const ticketsDB = require("../model/ticketsSchema");
const eventsDB = require("../model/eventsSchema");
const UsersDB = require("../model/UserSchema");



function addEvent(user, data){
  let event = new eventsDB(data)
  if(data.name ==="" || data.location==="" ){throw Error}
  event.dateCreated = Date()
  event.save()
 return addEventToUser(user.id ,event.id)
}

function addEventToUser(userID , listID){
  return UsersDB.findByIdAndUpdate(userID ,{$push : {eventsArr: listID}})
 }

module.exports = { addEvent};
