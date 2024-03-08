const mongoose = require("mongoose");

const Room = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        addedUsers: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Room", Room);