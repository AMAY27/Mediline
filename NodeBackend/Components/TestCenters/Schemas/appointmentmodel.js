const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    test_names: [],
    patient_name : {
        type: String,
        required: true
    },
    appointment_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    userid: {
        type: Number,
        required: true
    },
    center_id : {
        type:mongoose.Schema.ObjectId,
        required:true,
    },
    cost : {
        type:Number,
        required: true
    },
    reports : []
  },{collection : 'appointments'})
  module.exports = mongoose.model("Appointment",appointmentSchema);