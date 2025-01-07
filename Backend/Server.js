const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require('./db')
const cors = require('cors')
require('dotenv').config()
const route = require('./Routes/Route')

const PORT = process.env.PORT || 5000

app.use(bodyParser.json())

app.use(route)
app.get('/',(req ,res)=>{
    res.send('Hello world')
})

app.listen(PORT,()=>{
    console.log(`Server is up and listing on ${PORT}`)
})