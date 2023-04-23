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
    return eventsDB.find({category: category , eventDate : { $gte : new Date }})
  }
  if(date !== undefined  ){
    return eventsDB.find({date: date , eventDate : { $gte : new Date }})
  }
  return eventsDB.find({eventDate : { $gte : Date() } , $set: { eventDate: new Date("$$ROOT".eventDate).toLocaleString('he-IL' , {dateStyle : "full"}) } })
}

function getEventByID(id){
  return eventsDB.findById(id)
}

function getEventsCategory(){
  return eventsDB.aggregate([
    {$match: {
      eventDate : { $gte : new Date }
    }},
    {$group: {
      _id: "$category",
      events:{$push : "$$ROOT"}
    }}
  ])
}

module.exports = { addEvent , getEvents , getEventsCategory , getEventByID};
