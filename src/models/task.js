var mongoose = require('mongoose');
const validator = require('validator');

const Client = mongoose.model('Client',{
    name:{
        type: String,
    },
    address:{
        type: String,
    }
});

module.exports = Client;