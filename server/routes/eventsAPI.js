const express = require("express");
const eventsManager = require('../utilities/eventsManager')
const securityManager = require("../utilities/securityManager");
const router = express.Router();

const authToken = securityManager.authenticateToken


router.post("/events" ,authToken , function(req , res){
  let user = req.user
  let data = req.body
  eventsManager.addEvent(user, data)
  .then(() => res.status(201).send("success"))
  .catch(()=> res.status(400).send("error"))

})



module.exports = router;
