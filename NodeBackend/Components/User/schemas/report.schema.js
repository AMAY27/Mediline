const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
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
        required: true
    },
    s3Key:{
        type: String,
        required: true
    },
    appointmentIds : [mongoose.Schema.Types.ObjectId],
},{collection:"Reports"})

module.exports = mongoose.model("Report",reportSchema);