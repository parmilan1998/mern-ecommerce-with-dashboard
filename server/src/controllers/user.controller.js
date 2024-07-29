import asyncHandler from "express-async-handler";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/token.js";

// POST - http://localhost:8080/api/v1/user/register
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  // Check user is already registered
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    role: role || "user",
  });

  res.status(201).json({
    message: "User registered successfully",
    _id: user._id,
    username: user.username,
    email: user.email,
    password: user.password,
    role: user.role,
  });
});

// POST - http://localhost:8080/api/v1/user/login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  // Check email correct or not
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email" });
  }

  // Check password correct or not
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  // Generate JWT token
  const token = generateToken(user._id);

  res.json({
    message: "Logged in successfully",
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    token,
  });
});

// GET - http://localhost:8080/api/v1/user/logout
export const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Logout successful" });
});

// GET - http://localhost:8080/api/v1/user/profile
export const getUserInfo = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  });
});

// PUT - http://localhost:8080/api/v1/user/profile/id
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (username) user.username = username;
  if (email) user.email = email;
  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await user.save();

  res.status(200).json({
    message: "User profile updated successfully",
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    role: updatedUser.role,
  });
});

// DELETE - http://localhost:8080/api/v1/user/id
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ message: "User deleted successfully" });
});
