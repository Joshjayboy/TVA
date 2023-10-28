import express from "express";
import {
  changeUserPassword,
  deleteUserProfile,
  getLikedMovies,
  loginUser,
  registerUser,
  updateUserProfile,
  getUsers,
  addLikedMovie,
  deleteLikedMovies,
  deleteUser,
  applyUser,
} from "../Controllers/UserController.js";
import { protect, admin } from "../middlewares/Auth.js";

const router = express.Router();

// public routes
router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/apply", applyUser);

// private routes
router.put("/", protect, updateUserProfile);
router.delete("/", protect, deleteUserProfile);
router.put("/password", protect, changeUserPassword);
router.get("/favorites", protect, getLikedMovies);
router.post("/favorites", protect, addLikedMovie);
router.delete("/favorites", protect, deleteLikedMovies);

// Admin routes
router.get("/", protect, admin, getUsers);
router.delete("/:id", protect, admin, deleteUser);

export default router;
