import express from "express";
import { addMessage, getMessages } from "../controllers/messageController.js";

const router = express.Router();

router.post("/addMessage", addMessage);
router.get("/getMessages/:id", getMessages);

export default router;
