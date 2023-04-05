import express from "express";
import { createNewChat, getChat } from "../controllers/chatController.js";

const router = express.Router();

router.post("/createNewChat", createNewChat);
router.get("/getChat/:id", getChat);

export default router;
