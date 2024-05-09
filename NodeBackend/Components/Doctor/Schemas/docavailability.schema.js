const mongoose = require('mongoose')

const slot_object = {
    slot : {
        type: String,
        required: true
    },
    max_patients : {
        type: Number,
        required: true
    }
}

const docavailability = mongoose.Schema({
    weekday : {
        type: Number,
        required: true
    },
    time_slots : [slot_object],
    is_available : {
        type: Boolean,
        required: true
    },
    officeid : {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    docid : {
        type: mongoose.Schema.ObjectId,
        required: true
    }
},{collection: "Docavailability"})


module.exports = mongoose.model("Docavailability", docavailability)