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

router.post('/confirmTicket',authToken , function (req, res) {
    let eventID = req.body.eventID
    let ticketID = req.body.ticketID
    console.log(eventID)
    userDataManager.ifTicketIsExists(eventID , ticketID)
    .then(result =>{
        if(!result){ return res.status(401).send({error:"כרטיס לא תקין"})}
        userDataManager.updateScannedTicket(ticketID).then((response)=>{
            if(response === true){ res.send({success: "הכרטיס תוקף"})}
            else {return res.status(401).send({error:"הכרטיס שומש"})}
        })
    })
})


module.exports = router;