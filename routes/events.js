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


// PUT(Update): an endpoint to link an attendee to an event by attendee name & event ID.
router.put('/:id/:attendeeName', (req, res, next) => {

    EventModel.findOneAndUpdate({ _id: req.params.id, }, {
        $push: {
            attendeeList: req.params.attendeeName
        }
    }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Attendee is linked to the event via PUT.');
            console.log('Attendee is linked to the event.', data)
        }
    })
});


/*
Implement an endpoint that allows the retrieval of information about attendees 
by type of event (type of event will be a parameter). 
The end point should console log all attendees older than 18 years and simply return a status code 200 with the message "Success" if no error occurs.
*/

// GET(READ): an endpoint to retrieve all attendes older than 18 years old by event type.
router.get('/:type', (req, res, next) => {

    // Finding document based on event type
    EventModel.find({ type: req.params.type }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Information not found');
        }
        else {
            res.status(200).send('Success.');
            console.log('Attendee list:', data)
        }
    });
});


module.exports = router 