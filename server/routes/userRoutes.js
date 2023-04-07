import express from "express";
import {
  createAccount,
  getUserProfile,
  login,
} from "../controllers/userControllers.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/createaccount", createAccount);
router.post("/login", login);
router.get("/")
router.route("/profile").get(protect, getUserProfile);

export default router;
