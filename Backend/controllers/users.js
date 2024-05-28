const router = require("express").Router();
const User = require("../model/Users");
const bcrypt = require("bcrypt");

const SALT = Number(process.env.SALT);
const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;

// Registration route
router.post("/register", async (req, res) => {
  // Extracting user input from the request body
  let { firstname, lastname, email, password, isAdmin } = req.body;
  try {
    // Creating a new user with hashed password
    let newUser = new User({
      firstname,
      lastname,
      email,
      password: bcrypt.hashSync(password, SALT),
      isAdmin,
    });
    await newUser.save();

    // Sending a successful response with the newly created user
    res.status(201).json({ mesage: "new user created", newUser });
  } catch (err) {
    // Handling errors and sending an error response
    console.log(err);
    res.status(500).json({ message: `${err}` });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find a user with this email
    const foundUser = await User.findOne({ email });
    // Check wether the password matches
    const verify = await bcrypt.compare(password, foundUser.password);

    if (!verify) throw Error("Incorrect password");

    // Generate a JWT token for user authentication
    const token = jwt.sign(
      { _id: foundUser.id },
      JWT_KEY,
      // Expire in 24 hours
      { expiresIn: 60 * 60 * 24 }
    );

    res.status(200).json({
      message: "Logged in",
      foundUser,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `${err}` });
  }
});

// Update user information
router.put("/update/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { firstname, lastname, email, password } = req.body;

    // Check if the user exists
    const userToUpdate = await User.findById(userId);
    if (!userToUpdate) throw Error("User not found");

    // Update user data
    userToUpdate.firstname = firstname;
    userToUpdate.lastname = lastname;
    userToUpdate.email = email;
    userToUpdate.password = bcrypt.hashSync(password, SALT); // Update hashed password

    // Save the updated user
    await userToUpdate.save();

    res.status(200).json({
      message: "User updated successfully",
      updatedUser: userToUpdate,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `${err}` });
  }
});

// Delete user route
router.delete("/delete/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if the user exists
    const userToDelete = await User.findById(userId);
    if (!userToDelete) throw Error("User not found");

    // Delete the user
    await userToDelete.remove();

    res.status(200).json({
      message: "User deleted successfully",
      deletedUser: userToDelete,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `${err}` });
  }
});

module.exports = router;

