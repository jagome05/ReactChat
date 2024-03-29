const mongoose = require("mongoose");
const Message = require("./Message");
const Users = require("./Users");

const Room = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    addedUsers: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: false,
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", Room);

// ? references
// https://stackoverflow.com/questions/47274616/mongoose-query-to-match-object-id-with-user-id-then-display-in-dom
// https://mongoosejs.com/docs/populate.html#population
//
