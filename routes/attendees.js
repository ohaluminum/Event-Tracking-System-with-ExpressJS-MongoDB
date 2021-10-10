const express = require("express");
const router = express.Router()
const AttendeeModel = require('../models/attendee');

// POST(CREATE): an endpoint that will insert an attendee info into DB.
router.post('/', (req, res, next) => {

    // Creating a new document using create() function.
    AttendeeModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Attendee information is added to the database.');
        }
    });
});


// GET(READ): an endpoint to get all attendee records - Testing purpose (for developer to see if POST work successfully).
router.get('/', (req, res, next) => {

    // Finding all attendee document in the DB.
    AttendeeModel.find((error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    });
});


module.exports = router