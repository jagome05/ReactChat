require('dotenv').config()
const express = require("express")
const app = express()

//connects to local server host
const PORT = process.env.PORT

//connects to db
const mongoose = require('mongoose')
const { dbConnect } = require('./db')

//connects to controllers
const messages = require('./controllers/message.js')
// const users = require('./controllers/users.js')
const admin = require('./middleware/isAdmin')

// * lets us read json
app.use(express.json())

// connects to endpoints
app.use('/api', messages)
// app.use('/users', users)
//* use this to test admin privelge ---> app.use('/admin', admin)


app.listen(PORT, () => {
  dbConnect()
  console.log('listening on port: ' + PORT) 
})
