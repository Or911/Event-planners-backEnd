const UsersDB = require("../model/UserSchema");
const bcrypt = require("bcryptjs");
const { json } = require("express");
const jwt = require("jsonwebtoken");


const secretKey = "my_secret_key";
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

function generateAccessToken(user) {
  return jwt.sign(user, secretKey)
}

async function authenticateUser(username, password) {
  const user = await UsersDB.findOne({ username: username });
  if (!user) {
    return null}

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid){
    return null}

  return { id: user._id, username: user.username };
}

const addUser = function (req) {
  const user = new UsersDB({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, salt)
  });
  user.save().then((user) => {
  });
};

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  let token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send({ message: "No token was inserted" });
  }
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(401).send({ message: "You don't have permission" });
    }
    req.user = user;
    next();
  })
}


module.exports = { addUser , generateAccessToken , authenticateUser ,authenticateToken};
