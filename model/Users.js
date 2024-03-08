const mongoose = require("mongoose");

const Users = new mongoose.Schema(
    {
        firstname: {
            type: String,
            maxLength: 20,
            required: true,
        },
        lastname: {
            type: String,
            maxLength: 20,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
          type: Boolean,
          defualt: false
        }
    }
);

module.exports = mongoose.model("users", Users)
