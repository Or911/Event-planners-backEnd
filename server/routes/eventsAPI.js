const express = require("express");
const eventsManager = require('../utilities/eventsManager')
const securityManager = require("../utilities/securityManager");
const router = express.Router();

const authToken = securityManager.authenticateToken

router.get("/events", function(req, res) {
  let category = req.query.category === '' ? null : req.query.category;
  let date = req.query.date === undefined ? new Date() : req.query.date;
  let id = req.query.id;

  eventsManager.getEvents(category, date, id)
  .then((events) => {
    if (events.length === 0) {
      res.status(404).send("No events found for the specified category, date, and id.");
    } else {
      res.status(200).send(events);
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send("Internal server error.");
  });
});

router.get("/event/:id" , function(req , res){
  let eventID = req.params.id 
  eventsManager.getEventByID(eventID)
  .then((event) => res.status(200).send(event))
  .catch(()=> res.status(400).send("error"))
})

router.post("/event" ,authToken , function(req , res){
  let user = req.user
  let data = req.body
  eventsManager.addEvent(user, data)
  .then(() => res.status(201).send("success"))
  .catch(()=> res.status(400).send("error"))
})

router.delete("/event/:id", authToken, function(req, res) {
  let user = req.user;
  let eventId = req.params.id;

  eventsManager.deleteEventByID(user, eventId)
    .then((deleted) => {
      res.status(201).send(deleted);
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send(error.message);
    });
});


module.exports = router;