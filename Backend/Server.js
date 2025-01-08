const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require('./db')
const cors = require('cors')
require('dotenv').config()
const route = require('./Routes/Route')
console.log("Cloudinary API Key:", process.env.CLOUDINARY_API_KEY);

const PORT = process.env.PORT || 5000

app.use(bodyParser.json())

app.use(route)
app.get('/',(req ,res)=>{
    res.send('Hello world')
})

app.listen(PORT,()=>{
    console.log(`Server is up and listing on ${PORT}`)
})