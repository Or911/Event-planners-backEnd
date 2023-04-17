const express = require("express");
const router = express.Router();
const securityManager = require("../utilities/securityManager");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await securityManager.authenticateUser(username, password)
  if(!user){
    return res.status(401).send({ message: "Invalid username or password" })
  }
 const token = securityManager.generateAccessToken(user)
  res.send({token})
})


router.post("/sign", (req, res) => {
  securityManager.addUser(req);
  res.status(201).send({success:"successfully created a user"});
})

module.exports = router;
