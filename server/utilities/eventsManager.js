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

function getEventByID(id){
  return eventsDB.findById(id)
}

function getEvents(category, date, id) {
  const aggregateFormat = [
    {
      $match: {
        eventDate: { $gte: new Date() },
      },
    },
    {
      $sort: {
        eventDate: 1 
    }
    },
    {
      $group: {
        _id: `$${id}`,
        events: { $push: "$$ROOT" },
      },
    },
  ];

  if (category) {
    aggregateFormat[0].$match.category = category;
  }

  return eventsDB.aggregate(aggregateFormat)
  .catch((error) => {
    console.error(error);
    throw new Error("Could not retrieve events from the database.");
  });
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

module.exports = { addEvent , getEvents , getEventByID , deleteEventByID};
