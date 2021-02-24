var mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manger-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

// const Client = mongoose.model('Client',{
//     name:{
//         type: String,
//     },
//     address:{
//         type: String,
//     }
// });
// const c1 = new Client({
//     name: 'makadia',
//     address: 'patel park-2 rajkot',
// });
// c1.save().then(()=>{
//     console.log(c1);
// }).catch((err)=>{
//     console.log(err);
// })


// const me = new User({
//   name: 'a s d f f          ',
//   age: 5,  
//   password : 'password',
// })

// me.save().then(()=>{
//     console.log(me);
// }).catch((error)=>{
//     console.log(error.message);
// })