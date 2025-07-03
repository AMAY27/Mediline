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
    name: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        required: true
    },
    date_joined: {
        type: Date,
        required: true
    }
},{collection: 'Users'})

module.exports = mongoose.model("User", userSchema);