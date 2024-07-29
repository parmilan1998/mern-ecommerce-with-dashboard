import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserInfo,
  updateUserProfile,
  deleteUser,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);
router.get("/profile", protect, getUserInfo);
router.put("/profile/:id", protect, updateUserProfile);
router.delete("/:id", protect, deleteUser);

export default router;
