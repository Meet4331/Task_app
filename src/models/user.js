var mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User',{
    name:{
        type: String,
        required: true,
        trim: true,
        lowercase : true,
    },
    age:{
        type: Number,
        validate(value){
            if(value<0){
                throw new Error('age is less than 0');
            }
        }
        
    },
    password:{
        type : String,
        require : true,
        minlength : 5,
        trim : true,
        validate(value){
            if(value.includes('password')){
                throw new Error('passqword is in pass');
            }
        }
    },
})
module.exports = User;