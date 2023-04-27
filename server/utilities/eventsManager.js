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
  return eventsDB.find({eventDate : { $gte : Date() }})
}

function getEventByID(id){
  return eventsDB.findById(id)
}

function getEventsCategory(category , date , id){
  const aggregateFormat = [
    {$match: {
      eventDate : { $gte : date },
    }},
    {$group: {
      _id: `$${id}`,
      events:{$push : "$$ROOT"}
    }}
  ]

  category ? aggregateFormat[0].$match.category = category : null

  return eventsDB.aggregate(aggregateFormat)
}

function deleteEventByID(user, eventId) {
  return eventsDB.findByIdAndDelete(eventId)
    .then((deletedEvent) => {
      if (!deletedEvent) {
        throw new Error('Event not found');
      }
      return UsersDB.updateOne({ username: user.username }, { $pull: { eventsArr: eventId } })
        .then(() => {
          return deletedEvent;
        });
    });
}

module.exports = { addEvent , getEvents , getEventsCategory , getEventByID , deleteEventByID};
