// This module helps us to load environment variables from a .env file into process.env.
require("dotenv").config();

// Import express module
const express = require('express')
const app = express()

// Import mongoose library.
const mongoose = require('mongoose')

// Adding better logging functionality: can see who is making the request in the terminal.
const morgan = require("morgan");

// Setting up mongoose DB connection.
mongoose
    .connect(process.env.MONGO_URL)       // Read environment varibale from .env file
    .then(() => {
        console.log("Database connection Success!");
    })
    .catch((err) => {
        console.error("Mongo Connection Error", err);
    });

app.use(express.json());    // Allows us to access request body as req.body
app.use(morgan("dev"));     // Enable incoming request logging in dev mode
    
// Setting up routers
//const intakesRouter = require('./routes/intakes')
//app.use('/intakes', intakesRouter)


// Declare the port number.
const PORT = 5000;

app.listen(PORT, () => {
    console.log("Server started listening on port: ", PORT);
});

// Error handler
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) 
        err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});