const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require('./db')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()


const route = require('./Routes/Route')
console.log("Cloudinary API Key:", process.env.CLOUDINARY_API_KEY);

const PORT = process.env.PORT || 5000

app.use(bodyParser.json())

 app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
 }))

 app.use(cookieParser())
app.use(route)
app.get('/',(req ,res)=>{
    res.send('Hello world')
})

app.listen(PORT,()=>{
    console.log(`Server is up and listing on ${PORT}`)
})