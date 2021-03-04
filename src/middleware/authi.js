const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async(req, res, next)=>{
    try{

        const token = req.header('Authorization').replace('Bearer ','');
        console.log(token);
        const decode = jwt.verify(token,'thisisme');
        console.log(decode._id);
        const user = await User.findOne({ _id: decode._id,'tokens.token':token});
        console.log(user);
        if(!user){
            throw new Error('user is null');
        }
        req.token = token;
        req.user = user;
        next();
    }
    catch(e){
        console.log(e.message);
        res.status(503).send({error: e.message});
    }
}

module.exports = auth;