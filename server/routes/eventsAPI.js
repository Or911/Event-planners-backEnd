const express = require("express");
const eventsManager = require('../utilities/eventsManager')
const securityManager = require("../utilities/securityManager");
const router = express.Router();

const authToken = securityManager.authenticateToken


router.get("/events" , function(req , res){
  let category = req.body.category 
  let date = req.body.date
  
  eventsManager.getEvents(category , date)
  .then((events) => res.status(200).send(events))
  .catch(()=> res.status(400).send("error"))
})

router.get("/eventsCategory" , function(req , res){
  eventsManager.getEventsCategory()
  .then((events) => res.status(200).send(events))
  .catch(()=> res.status(400).send("error"))
})

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



module.exports = router;
