const mongoose = require('mongoose')

const doctorSchema = mongoose.Schema({
    email : {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    title : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    contact : {
        type: String,
        required: true
    },
    address : {
        city: String,
        state: String,
        zip: String,
        street: String,
        landmark: String
    },
    location: {
        type: {
            type: String, // GeoJSON type, should be 'Point'
            enum: ['Point'], // Only 'Point' is allowed
            required: true
        },
        coordinates: {
            type: [Number], // Array of numbers for [longitude, latitude]
            required: true
        }
    },
    keywords : {
        type: [String],
        required: true
    },
    services : {
        type: [String],
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
    }
},{collection: 'Doctor_new'})

module.exports = mongoose.model("DoctorSchema", doctorSchema);