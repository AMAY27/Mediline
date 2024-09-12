const mongoose = require('mongoose')

const doctorSchema = mongoose.Schema({
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    professional_details : {
        type: String,
        required: false
    },
    date_joined : {
        type: Date,
        required: true
    },
    is_active : {
        type: Boolean,
        required: true
    },
    specializations : []
},{collection: 'Doctors'})

module.exports = mongoose.model("Doctor", doctorSchema);