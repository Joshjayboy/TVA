import express from "express";
import { applyUser } from "../Controllers/ApplyController.js";

const router = express.Router();

// public routes
router.post("/apply", applyUser);

export default router;
