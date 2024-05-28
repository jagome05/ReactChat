const router = require("express").Router();
const Room = require("../model/Room");
const admin = require("../middleware/isAdmin");

// Endpoint to display all rooms
router.get("/all", async (req, res) => {
  try {
    const allRooms = await Room.find();
    res.status(200).json({ message: "Here are the rooms", allRooms });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Endpoint to get a room by ID
router.get("/:roomId", async (req, res) => {

  const roomId = req.params.roomId;

  try {
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json({ message: "Room found", room });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Endpoint to create a new room
router.post("/new", async (req, res) => {

  const { name, description, addedUsers } = req.body;
  let messages = [];
  try {
    let newRoom = new Room({
      name,
      description,
      addedUsers,
      messages,
    });
    await newRoom.save();
    res.status(200).json({ message: "New room created", newRoom });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

// Endpoint to update a room by ID
// ! how to update only one part and match with front-end?? if statements?
router.put("/:roomId", admin, async (req, res) => {
  const { name, description, addedUsers } = req.body;
  const roomId = req.params.roomId;

  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      {
        name,
        description,
        addedUsers,
      },
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json({ message: "Room updated", room: updatedRoom });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }

});

// Endpoint to delete a room by ID
router.delete("/:roomId", admin, async (req, res) => {

  const roomId = req.params.roomId;

  try {
    const deletedRoom = await Room.findByIdAndDelete(roomId);

    if (!deletedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json({ message: "Room deleted", room: deletedRoom });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
