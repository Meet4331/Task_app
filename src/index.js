const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Client = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.post('/users', async(req, res) => {
    const user = new User(req.body);
    try{
        await user.save();
        res.status(200).send(user);
    }
    catch{
        res.status(400).send(err);
    }
   
})
app.get('/users', async(req, res)=>{
    try{
        const users = await User.find({});
        res.status(200).send(users);
    }
    catch(err){
        res.status(400).send(err);
    }

    // User.find({}).then((user)=>{
    //     res.send(user);
    // }).catch((err)=>{
    //     res.send(err);
    // })

})
app.get('/user/:id', async(req, res)=>{
    
    const _id = req.params.id;
    try{
        console.log(_id);
        const userss = await User.findById(_id);
        res.status(200).send(userss);
    }
    catch(err){
        res.status(400).send(err);
    }

    // const _id = req.params.id;
    // User.findById(_id).then((result)=>{
    //     res.send(result);
    // }).catch((err)=>{
    //     res.send(err);
    // })
})

app.delete('/user/:id',async(req, res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).send(user);

    }
    catch(e){
        res.status(400).send(e);
    }
})

app.patch('/user/:id', async(req, res)=>{

    const update = Object.keys(req.body);
    const allowUpdate = ['name','password'];
    const isValid = update.every((update)=>allowUpdate.includes(update));
        
    if(!isValid){
        return res.status(400).send("erro in sending");
    }

    try{
        const usersss = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true});
        res.status(200).send(usersss);
    }
    catch(e){
     res.status(400).send(e); 
    }
    
})

app.post('/task', (req, res) => {
    const task = new Client(req.body);
    task.save().then(() => {
        res.send(task);
    }).catch((err) => {
        res.send(err);
    })
})



app.listen(port, () => {
    console.log('running on port ' + port);
})

