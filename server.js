require('dotenv').config()
const express = require("express")
const app = express()

//! Here is a link to the postman with all the methods
//! Unsure if it will work tho
// https://www.postman.com/payload-geologist-81105746/workspace/ptsb-dec-projects/collection/32906590-da21d895-f361-4792-a49e-37ba07687c66?action=share&creator=32906590

//connects to local server host
const PORT = process.env.PORT

//connects to db
const mongoose = require('mongoose')
const { dbConnect } = require('./db')

//connects to controllers
const messages = require('./controllers/message.js')
const users = require('./controllers/users.js')
const room = require('./controllers/room.js')
const admin = require('./middleware/isAdmin')

// * lets us read json
app.use(express.json())

// connects to endpoints
app.use('/api', messages)
app.use('/users', users)
app.use('/room', room)

// app.post('/admin', admin) //* use this to test admin privelge

app.listen(PORT, () => {
  dbConnect()
  console.log('listening on port: ' + PORT) 
})
