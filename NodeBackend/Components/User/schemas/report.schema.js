const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Title is required']
    },
    description:{
        type: String,
        required: false
    },
    date:{
        type: Date,
        required: true
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    s3Key:{
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return v && v.length > 0;
            },
            message: 's3Key is required for report file storage'
        }
    },
    appointmentIds : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ConsultationAppointment'
        }
    ],
},{collection:"Reports", timestamps: true})

module.exports = mongoose.model("Report",reportSchema);