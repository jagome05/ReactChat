const router = require("express").Router();
const mongoose = require("mongoose");
const { dbConnect } = require("../db");
const admin = require("../middleware/isAdmin");

const Message = require("../model/Message");
const Room = require("../model/Room");
const Users = require("../model/Users");
const { ObjectId } = require("mongodb");

//*GET Reqs
// GET all messages
router.get("/allMessages", async (req, res) => {
  const messages = await Message.find();
  res.status(200).json({ messages });
});

router.get("/findMessage/:id", async (req, res) => {
  try {
    const findMessage = await Message.findById(req.params.id);

    if (!findMessage) {
      return res.status(404).json({ message: "No message exists" });
    }

    res.status(200).json({ findMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

//! update for roomID rathrer than name
// *POST Req
//todo make sure to update author to user, and room
router.post("/postMessage", async (req, res) => {
  //* creates new timestamp
  let timestamp = new Date();

  // *example of post for postman
  // {
  //   "room": "Main",
  //   "author": "Jimmy",
  //   "body": "New Message Created"
  // }

  // --> this creates new var from req.body

  let { room, author, body } = req.body;

  const _id = new mongoose.Types.ObjectId();

  let authorInfo = await Users.findById(author);
  let authorName = (authorInfo ? authorInfo.firstname : "guest")

  //* makes new message from req.body + timestamp
  const newMessage = new Message({
    _id,
    room,
    author,
    authorName,
    body,
    timestamp,
  });

  let findRoom = await Room.findById(room);
  findRoom.messages.push(newMessage._id);

  // * saves to DB
  await newMessage.save();
  await findRoom.save();

  res.status(200).json({ message: `new message posted`, newMessage });
});

//*PUT Req
router.put("/updateMessage/:id", admin, async (req, res) => {
  // find by ObjectId using params
  const findMessage = await Message.findOne({ _id: req.params.id });

  // pulls new info from body
  const { room, author, body } = req.body;

  // updates the found message with body //? found other ways to update on mongoose
  const updatedMessage = await findMessage.updateOne({ room, author, body });

  res.status(200).json({ message: `message updated`, updatedMessage });
});

//*DELETE Req
router.delete("/deleteMessage/:id", admin, async (req, res) => {
  let postId = req.params.id;
  // find by ObjectId using params
  const findMessage = await Message.findOne({ _id: req.params.id });
  await findMessage.deleteOne();
  let findRoom = await Room.findByIdAndUpdate(
    findMessage.room,
    {
      $pull: {
        messages: ObjectId(req.params.id),
      },
    },
    { new: true }
  );

  console.log(findRoom);

  res.status(200).json({ message: `message deleted`, findMessage });
});

module.exports = router;

//? References
// https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate()
// https://www.geeksforgeeks.org/mongoose-populate-method/
// https://stackoverflow.com/questions/77557660/delete-specific-object-in-array-element-in-document-and-save-mongoose

