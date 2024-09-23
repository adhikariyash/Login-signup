import express from "express";
import { dbConnection } from "./src/db/database.js";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";
import { userModel } from "./src/models/index.model.js";
import jwt from "jsonwebtoken";

dotenv.config();
const Port = process.env.PORT || 8000;
const app = express();

app.use(cors({
  origin: "http://localhost:5173", // Ensure this matches your frontend URL
  methods: ["POST", "PUT"],
  credentials: true
}));
app.use(express.json());

dbConnection()
  .then(() => console.log("db connection successful"))
  .catch(err => console.log(err));

// Signup route
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new userModel({ username, email, password: hashPassword });

    // Save the user
    await newUser.save();

    // Send success response
    res.status(201).json({ status: "success", message: "Successfully created user" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error creating user", error });
  }
});

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  userModel.findOne({ username })
    .then(user => {
      if (!user) {
        return res.status(404).json({ status: "error", message: "User not found" });
      }

      // Compare password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (isMatch) {
          const token = jwt.sign({ email: user.email }, "jwt-secret-key", { expiresIn: "1d" });
          res.cookie('token', token, { httpOnly: true });
          res.status(200).json({ status: "success", message: "Login successful", token });
        } else {
          res.status(401).json({ status: "error", message: "Password is incorrect" });
        }
      });
    })
    .catch(err => res.status(500).json({ status: "error", message: "Internal server error", error: err }));
});

app.put("/logged", async (req, res) => {
  const {  username } = req.body;
  

  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { username: username },       
      { LoggedIn: true },       
      { new: true }                     
    );

    if (updatedUser) {
      res.status(200).json({ message: "LoggedIn status updated successfully", LoggedIn: updatedUser.LoggedIn });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while updating LoggedIn status" });
  }
});
app.listen(Port, () => {
  console.log(`Your app is running on port ${Port}`);
});
