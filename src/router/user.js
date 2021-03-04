const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/authi');
const { sendWelcome }= require('../emails/account');
const router = new express.Router(); 

router.post('/users', async(req, res) => {
    const user = new User(req.body);
    try{
        await user.save();
        sendWelcome(user.email, user.name);
        res.status(200).send(user);
    }
    catch{
        res.status(400).send(err);
    }
   
})
router.get('/users/me', auth, async(req, res)=>{
    try {
        
        res.send(req.user);
    } catch (error) {
        res.send({error:'user not found'})
    }
    //preview
    // try{
    //     const users = await User.find({});
    //     console.log(users);
    //     res.status(200).send(users);
    // }
    // catch(err){
    //     res.status(400).send(err);
    // }
    // User.find({}).then((user)=>{
    //     res.send(user);
    // }).catch((err)=>{
    //     res.send(err);
    // })

})
router.get('/user/:id', async(req, res)=>{
    
    const _id = req.params.id;
    try{
        console.log(_id);
        const userss = await User.findById(_id);
        res.status(200).send(userss);
    }
    catch(err){
        res.status(400).send(err);
    }
    //preview
    // const _id = req.params.id;
    // User.findById(_id).then((result)=>{
    //     res.send(result);
    // }).catch((err)=>{
    //     res.send(err);
    // })
})

router.delete('/user/:id',async(req, res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).send(user);

    }
    catch(e){
        res.status(400).send(e);
    }
})

router.post('/user/login',async(req, res)=>{
    try{
        const user = await User.findByCredentials(req.body.name, req.body.password);

        const token = await user.generateToken();
        res.send({ user, token });
        
    }catch(e){
        res.status(400).send(e);
    }

})
router.post('/user/logout',auth, async(req, res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token;
        })
        await req.user.save();
        res.status(200).send("thai giyu");
    }catch(e){
        res.status(500);

    }

})

router.patch('/user/:id', async(req, res)=>{

    const update = Object.keys(req.body);
    console.log(update);
    const allowUpdate = ['name','password'];
    const isValid = update.every((update)=>allowUpdate.includes(update));
    console.log(isValid);
        
    if(!isValid){
        console.log("hello");
        return res.status(400).send("erro in sending");
    }

    try{
        // console.log(req.params.id);
        const user = await User.findById(req.params.id);
        console.log(user);
        update.forEach((update) => user[update] = req.body[update])

        await user.save();
        res.status(200).send(user);

        //const usersss = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true});
        
    }
    catch(e){
     res.status(400).send("error "); 
    }
    
})

module.exports = router;