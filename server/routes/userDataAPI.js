const express = require("express");
const userDataManager = require('../utilities/userDataManager')
const securityManager = require("../utilities/securityManager");
const router = express.Router();

const authToken = securityManager.authenticateToken

router.get('/userInfo',authToken , function (req, res) {
    userDataManager.getEventsOfUser(req.user)
    .then(eventsUser => res.send(eventsUser))
})

module.exports = router;