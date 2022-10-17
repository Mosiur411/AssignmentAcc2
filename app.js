const express = require("express");
require("dotenv").config();
const app = express();

//Middleware
const errorMiddleware = require('./middleware/error.js')

app.use(express.json())
app.use(errorMiddleware)

// Routes 
const tourRoute = require('./routes/v1/tour.route.js')

// Use v1 Api
app.use('/api/v1/' , tourRoute)


app.get("/", (req, res) => {
  res.send("Welcome to Tour Server");
});

app.all('*' , (req,res) => {
  res.send('Api Not Found')
})


module.exports = app



