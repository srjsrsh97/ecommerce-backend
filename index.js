const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes')
require('dotenv').config()

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    console.log( `${req.method} ${req.url}`)
    next()
})



app.use(router)


const PORT = process.env.PORT || 8082


mongoose.connect(process.env.MONGOURI||'mongodb://localhost:27017').then(()=> console.log("connected to db"))


app.listen(PORT,() => {
console.log(`app running on port ${PORT}`)
})