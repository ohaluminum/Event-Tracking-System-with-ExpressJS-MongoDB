const express = require("express");
const router = express.Router()
const EventModel = require('../models/event');
const AttendeeModel = require('../models/attendee');


// POST(CREATE): an endpoint that will insert an event info into DB.
router.post('/', (req, res, next) => {

    // Creating a new document using create() function.
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

    // Finding all event document in the DB.
    EventModel.find((error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    }).sort({ date: -1 });     // Sort by event date in descending order
});


// PUT(Update): an endpoint to link an attendee to an event by attendee name & event ID.
router.put('/:id/:attendeeName', (req, res, next) => {

    // Find document by event ID
    EventModel.findOneAndUpdate({ _id: req.params.id, }, {
        $push: {
            attendeeList: req.params.attendeeName     // attendeeList is an array: push the new attendee to this array.
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


// GET(READ): an endpoint to retrieve all attendes older than 18 years old by event type.
router.get('/:type', (req, res, next) => {

    // Finding document based on event type
    EventModel.find({ type: req.params.type }, { _id: 0, attendeeList: 1 }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Information not found');
        }
        else {
            res.status(200).send('Success.');
            
            console.log("Attendee List:")

            data.forEach(attendees => {     // Data example: { attendeeList: [ 'Lejing-Huang', 'Celeste-Luo' ] }
                
                // Get the attendee name that stored inside the attendeeList field.
                attendees.attendeeList.forEach(attendee => {

                    // Find the attendee by name in the attendee schema (make sure the attendee exists in the DB).
                    AttendeeModel.find({ name: attendee}, (error, data) => {
                        if (error) {
                            return next(error);
                        }
                        else if (data === null) {
                            console.log('Attendee not found in DB.');
                        }
                        else {
                            // Age check: only log attendees older than 18 years.
                            if (data[0].age > 18) {
                                console.log(data[0].name)
                            }
                        }
                    });
                });
            });
        }
    });
});


module.exports = router