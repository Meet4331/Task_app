const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'User-data';

mongoClient.connect(connectionUrl, { useUnifiedTopology: true }, (err, client)=>{
    if(err){
        return console.log("error");
    }
    const db = client.db(databaseName);
    db.collection('user').insertOne({
        name : 'meet',
        age : 21
    },(err, data)=>{
        if(err){
            return console.log("error");
        }
        console.log(data.ops);
    })
    // db.collection('task').insertMany([
    //     {
    //         name:'meet',
    //         age:21

    //     },
    //     {
    //         name:'xz',
    //         age:22
    //     },
    //     {
    //         name:'ds',
    //         age:23
    //     }
    // ],(err, data)=>{
    //     if(err){
    //         return console.log('err');
    //     }
    //     console.log(data.ops);
    // })

    console.log("connection succesful");
})
