const router = require("express").Router()
const mongoose = require('mongoose')
const { dbConnect } = require('../db')

const Message = require('../model/Message')

//todo make sure to update when room endpoints are done -John
// todo should messages add onto room endpoints? --> ex. /roomName/allMessages?

//*GET Reqs
// GET all messages
router.get('/allMessages', async (req,res) => {
  const messages = await Message.find()
  res.send(messages)
})

// *POST Req
//todo make sure to update author to user, and room
router.post('/postMessage', async (req, res) => {
  //* creates new timestamp
  let timestamp = new Date

  // *example of post for postman
  // {
  //   "room": "Main",
  //   "author": "Jimmy",
  //   "body": "New Message Created"
  // }

  // --> this creates new var from req.body
  const { room, author, body } = req.body

  //* makes new message from req.body + timestamp
  const newMessage = new Message({
    room,
    author,
    body,
    timestamp
  })

  // * saves to DB
  await newMessage.save()
  res.status(200).json({ message: `new message posted`, newMessage})
})

//*PUT Req
router.put('/updateMessage/:id', async (req,res) => {
  // find by ObjectId using params
  const findMessage = await Message.findOne({_id: req.params.id})

  // pulls new info from body
  const { room, author, body } = req.body

// updates the found message with body //? found other ways to update on mongoose
  const updatedMessage = await findMessage.updateOne({room, author, body})

  res.status(200).json({ message: `message updated`, updatedMessage})
})

//*DELETE Req
router.delete('/deleteMessage/:id', async (req,res) => {
  // find by ObjectId using params
  const findMessage = await Message.findOne({_id: req.params.id})
  await findMessage.deleteOne()

  res.status(200).json({ message: `message deleted`})
})


module.exports = router

//? References
// https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate()