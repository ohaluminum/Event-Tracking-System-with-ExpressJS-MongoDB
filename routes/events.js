const express = require("express");
const router = express.Router()
const EventModel = require('../models/event');

// POST(CREATE): an endpoint that will insert an event info into DB.
router.post('/', (req, res, next) => {

    EventModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Event information is added to the database.');
        }
    });
});


// GET(READ): an endpoint to get all event records.
router.get('/', (req, res, next) => {

    EventModel.find((error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    }).sort({ date: -1 });
});


module.exports = router