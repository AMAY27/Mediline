const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    first_name : {
        type: String,
        required: true
    },
    last_name : {
        type: String,
        required: true
    },
    gender : {
        type: String,
        required: true
    },
    birthDate : {
        type: Date,
        required: true
    },
    contact : {
        type: String,
        required: true
    },
    is_active : {
        type: Boolean,
        required: true
    },
    date_joined : {
        type: Date,
        required: true
    }
},{collection: 'Users'})

module.exports = mongoose.model("User", userSchema);