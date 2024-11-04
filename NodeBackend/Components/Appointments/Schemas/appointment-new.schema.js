const mongoose = require('mongoose');

const appointmentNewSchema = mongoose.Schema({
    docid : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    officeid : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userid : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    appointment_date : {
        type: String,
        required: true
    },
    appointment_day : {
        type: Number,
        required: true
    },
    time_slot : {
        type: String,
        required: true
    },
    is_completed : {
        type: Boolean,
        required: true
    },
    prescriptions : [],
    reports: []
})