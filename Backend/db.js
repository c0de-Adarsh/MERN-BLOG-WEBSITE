const mongoose = require('mongoose');
require('dotenv').config()

const mongoUrl = process.env.MONGO_URL

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