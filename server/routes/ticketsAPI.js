const express = require("express");
const ticketManager = require('../utilities/ticketManager')
const securityManager = require("../utilities/securityManager");
const router = express.Router();

const authToken = securityManager.authenticateToken

router.get("/tickets" , authToken ,function(req , res){
  let user = req.user
  let eventName = req.body.eventName
  
  ticketManager.getTickets(user , eventName)
  .then((tickets) => res.status(200).send(tickets[0].ticketsArr))
  .catch(()=> res.status(400).send("error"))
})

router.post("/ticket" , authToken , function(req , res){
  let user = req.user
  let eventId = req.body.eventId
  let eventPrice = req.body.eventPrice

  ticketManager.addTicket(user, eventId , eventPrice)
  .then(() => res.status(201).send("success"))
  .catch(()=> res.status(400).send("error"))
})


module.exports = router;