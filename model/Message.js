const mongoose = require('mongoose')

const Message = new mongoose.Schema({
  
    room: {
      type: String
    },
    author: {
      // todo make sure to match it to userId
      type: String
    },
    body: {
      type: String
    },
    timestamp: {
      type: Date
    }
})

module.exports = mongoose.model('messages', Message)
