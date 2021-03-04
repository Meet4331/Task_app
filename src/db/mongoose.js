var mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true  
})


//previous code
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