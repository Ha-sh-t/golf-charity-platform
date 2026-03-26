import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  setCharity,
  getCharities,
} from "../controllers/charityController.js";

const router = express.Router();

router.get("/", getCharities);
router.post("/select", protect, setCharity);

export default router;