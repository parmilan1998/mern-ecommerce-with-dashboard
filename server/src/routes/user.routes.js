import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserInfo,
  updateUserProfile,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", getUserInfo);
router.put("/profile/:id", updateUserProfile);
router.delete("/:id", deleteUser);

export default router;
