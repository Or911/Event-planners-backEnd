const express = require('express');
const app = express();
const path = require("path");
var cors = require("cors");
const eventsAPI = require('./server/routes/eventsAPI')
const loginAPI = require('./server/routes/loginAPI')
const ticketsAPI = require('./server/routes/ticketsAPI')
const userDataAPI = require('./server/routes/userDataAPI')
const {connectToDataBase} = require('./server/utilities/DBConnection')

app.use(cors())

connectToDataBase()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/' , userDataAPI)
app.use('/' , loginAPI)
app.use('/' , eventsAPI)
app.use('/' , ticketsAPI)

const port =4000
app.listen(port,()=>{
    console.log(`Running on port:  http://localhost:${port}`);
})