const mongoose = require('mongoose')

const officeSchema = mongoose.Schema({
    docid : {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    docname : {
        type: String,
        required: true
    },
    officename : {
        type: String,
        required: false
    },
    address : {
        type: String,
        required: true
    },
    pincode : {
        type: Number,
        required: true
    },
    service_tags : []
}, {collections : "Office"})

module.exports = mongoose.model("Office", officeSchema)