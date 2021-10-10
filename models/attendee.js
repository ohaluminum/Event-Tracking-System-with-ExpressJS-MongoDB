const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let attendeeSchema = new Schema({
    _id: {
        type: Number,
        required: true,
        unique: true,
        min: 1,
        max: 9999,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    }
},
    {
        collection: 'attendees'
    });
    
module.exports = mongoose.model('attendee', attendeeSchema)