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

const availability = {
    weekday : {
        type: Number,
        required:true
    },
    time_slots : [slot_object],
    is_available : {
        type : Boolean,
        required: true
    },
    docid : {
        type: mongoose.Schema.ObjectId,
        required: true
    }
}

const officeSchema = mongoose.Schema({
    docid : {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    docname : {
        type: String,
        required: true
    },
    officename : {
        type: String,
        required: false
    },
    address : {
        type: String,
        required: true
    },
    pincode : {
        type: Number,
        required: true
    },
    service_tags : [],
    weekly_availability : [availability]
}, {collections : "Office"})

module.exports = mongoose.model("Office", officeSchema)