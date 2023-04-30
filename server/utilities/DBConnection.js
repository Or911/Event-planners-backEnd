const CONFIG = require("../utilities/config")
const mongoose = require("mongoose");
const connectToDataBase = function (){
  mongoose.connect(process.env.MONGODB_URI||CONFIG.mongoDB);
}

module.exports = {connectToDataBase}