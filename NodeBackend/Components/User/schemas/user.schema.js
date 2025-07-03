const mongoose = require('mongoose');

// User Schema Definition
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,  // Automatically convert email to lowercase
        trim: true,  // Remove whitespace
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 6 characters long'],
    },
    first_name: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        minlength: [2, 'First name must be at least 2 characters long'],
    },
    last_name: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        minlength: [2, 'Last name must be at least 2 characters long'],
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: [true, 'Gender is required'],
    },
    birthDate: {
        type: Date,
        required: [true, 'Birth date is required'],
    },
    contact: {
        type: String,
        match: [/^\+?[1-9]\d{1,14}$/, 'Please provide a valid phone number'],
        required: false,
    },
    is_active: {
        type: Boolean,
        required: true,
        default: true,  // Default to true for new users
    },
    date_joined: {
        type: Date,
        required: true,
        default: Date.now,  // Automatically set the current timestamp
    },
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [false],
        ref: 'User',
    },
}, { timestamps: true, collection: 'MedilineUsers' });

module.exports = mongoose.model('User', userSchema);
