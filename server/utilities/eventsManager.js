const ticketsDB = require("../model/ticketsSchema");
const eventsDB = require("../model/eventsSchema");
const UsersDB = require("../model/UserSchema");

function addEvent(user, data){
  let event = new eventsDB({...data , organizer : user.username})
  if(data.name ==="" || data.location==="" ){throw Error}
  event.dateCreated = Date()
  event.save()
 return addEventToUser(user.id ,event.id)
}

function addEventToUser(userID , listID){
  return UsersDB.findByIdAndUpdate(userID ,{$push : {eventsArr: listID}})
}

function getEvents(category , date){
  if(category !== undefined){
    return eventsDB.find({category: category})
  }
  if(date !== undefined  ){
    return eventsDB.find({date: date})
  }
  return eventsDB.find({})
}

function getEventByID(id){
  return eventsDB.findById(id)
}

function getEventsCategory(){
  return eventsDB.aggregate([{
    $group: {
      _id: "$category",
      events:{$push : "$$ROOT"}
    }
  }])
}

module.exports = { addEvent , getEvents , getEventsCategory , getEventByID};
