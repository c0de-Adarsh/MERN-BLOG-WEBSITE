const mongoose = require('mongoose');

const mongoUrl = "mongodb://localhost:27017/blog"

mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection

db.on("connected",()=>{
    console.log('Mongodb connected successfully')
})

db.on("error",(err)=>{
    console.log("Mongodb connection error",err)
})

db.on('disconnected',()=>{
    console.log('Mongodb disconnected successfully')
})

module.exports = db;