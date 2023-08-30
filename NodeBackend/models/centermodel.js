const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    test_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
  });

const centerSchema = new mongoose.Schema({
    center_name :{
        type: String,
        required: true
    },
    address : {
        type : String,
        required: true
    },
    zip : {
        type: Number,
        required: true
    },
    contact : {
        type: Number,
        required: false
    },
    tests : [testSchema]
},{collection: 'Testcenters'})

module.exports = mongoose.model('Testcenter', centerSchema);