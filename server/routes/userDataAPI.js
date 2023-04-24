const express = require("express");
const userDataManager = require('../utilities/userDataManager')
const securityManager = require("../utilities/securityManager");
const router = express.Router();

const authToken = securityManager.authenticateToken

router.get('/userInfo',authToken , function (req, res) {
    userDataManager.getEventsOfUser(req.user)
    .then(eventsUser => res.send(eventsUser))
})

router.get('/userEvent/:id',authToken , function (req, res) {
    let eventID = req.params.id
    userDataManager.getTicketsOfEvent(eventID)
    .then(eventsUser => res.send(eventsUser))
})

module.exports = router;