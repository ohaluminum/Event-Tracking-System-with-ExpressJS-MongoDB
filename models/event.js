const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let activitySchema = new Schema({
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
        type1: {
            type: Boolean,
            required: true
        },
        type2: {
            type: Boolean,
            required: true
        },
        type3: {
            type: Boolean,
            required: true
        }
    },
    date: {
        type: Date,
        required: true
    }
},
    {
        collection: 'events'
    });
    
module.exports = mongoose.model('event', eventSchema)

// Schema Designation:

// 1. name: String - the descirption of event)

// 2. type: Boolean - any combination of type1 | type2 | type3 
//    e.g. 
//    a. type1 & type3          =>  type1: true, type2: false , type3: true
//    b. type2                  =>  type1: false, type2: true , type3: false
//    c. type1 & type2 & type3  =>  type1: true, type2: true , type3: true

// 3. date: Date - event date