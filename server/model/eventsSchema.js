const mongoose = require('mongoose');
const schema = mongoose.Schema;

const eventsSchema = new schema({
    name:{ type: String, required: true },
    organizer:{ type: String, required: true },
    entertainer:{ type: String, default: this.organizer },
    description:String,
    eventDate:{ type: Date, required: true},
    price:[],
    likes: { type: Number, default: 0 },
    location:{ type: String, required: true},
    dateCreated:{ type: Date, default: new Date } ,
    category:{ type: String, default: true},
    img:String,
    ticketsList :[{ type: schema.Types.ObjectId, ref: "ticket" }]
})


const events = mongoose.model('events', eventsSchema);
module.exports = events;



