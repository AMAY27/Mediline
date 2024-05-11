const mongoose = require('mongoose')

const appointmentSchema = mongoose.Schema({
    docid : {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    officeid : {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    userid : {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    patient_name : {
        type: String,
        required: true
    },
    doc_name : {
        type: String,
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
    prescriptions : [],
    reports: []
}, {collection : "ConsultationAppointment"})

module.exports = mongoose.model("Consultation", appointmentSchema)