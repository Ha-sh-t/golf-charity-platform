import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { addScore , deleteScore } from "../controllers/scoreController.js";

const router = express.Router();

router.post("/", protect, addScore);
router.delete("/:index", protect, deleteScore);
export default router;