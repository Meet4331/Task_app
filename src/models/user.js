var mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userScheema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    email:{
        type: String,
     },
    password: {
        type: String,
        require: true,
        minlength: 5,
        trim: true,
        validate(value) {
            if (value.includes('password')) {
                throw new Error('passqword is in pass');
            }
        }
    },
    tokens:[{
        token: {
            type :String,
            require: true
        }
    }]
})

userScheema.methods.generateToken = async function(){
    const user = this;
    const token = jwt.sign({ _id :user._id.toString() }, 'thisisme');
    user.tokens = user.tokens.concat({ token })
    await user.save();
    
    return token
}


userScheema.statics.findByCredentials = async(name, password)=>{
    const user = await User.findOne({ name });
    if(!user){
        throw new Error("error unable to login");
    }

    const isMatch =await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error("wrong match");
    }

    return user
} 

userScheema.pre('save',async function(next){
    const user = this;

    if(user.isModified('password')){
        user.password =await bcrypt.hash(user.password, 8);
    }
    console.log("middel ware called");

     next();
})

const User = mongoose.model('DEMO', userScheema);

module.exports = User;