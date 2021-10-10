const express = require("express");
const router = express.Router()
const AttendeeModel = require('../models/attendee');

// POST(CREATE): an endpoint that will insert an attendee info into DB.
router.post('/', (req, res, next) => {

    AttendeeModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Attendee information is added to the database.');
        }
    });
});


module.exports = router