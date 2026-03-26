import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { runDraw } from "../controllers/drawController.js";

const router = express.Router();

router.get("/run", protect, runDraw);

export default router;