const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let eventSchema = new Schema({
    _id: {
        type: Number,
        required: true,
        unique: true,
        min: 1000,
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
    type: { 
        type: Number,
        required: true,
        min: 1,
        max: 7,
        validate: {  // See detail below
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    date: {
        type: Date,
        required: true
    },
    attendeeList: {
        type: Array,
        default: []
    }
},
    {
        collection: 'events'
    });
    
module.exports = mongoose.model('event', eventSchema)

// Schema Designation:

// 1. name: String - the descirption of event)

// 2. type: Number - any combination of type1 | type2 | type3 (since the number of combination is limited, I decided to store it as number)
//    e.g. 
//    a. type1 => 1
//    b. type2 => 2
//    c. type3 => 3
//    d. type1 & type2 => 4
//    e. type1 & type3 => 5
//    f. type2 & type3 => 6
//    c. type1 & type2 & type3 => 7

// 3. date: Date - event date

// 4. attendeeList: Array - store attendee by name 