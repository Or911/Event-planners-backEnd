const mongoose = require('mongoose');
const schema = mongoose.Schema;

const eventsSchema = new schema({
    name:{ type: String, required: true },
    organizer:String,
    entertainer:String,
    description:String,
    price:[],
    likes:[],
    location:{ type: String, required: true},
    dateCreated:Date ,
    category:String,
    img:String
})


const events = mongoose.model('events', eventsSchema);
module.exports = events;


