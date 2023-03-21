import express from "express";
import {
  getItems,
  getItemsByCategory,
} from "../controllers/itemsController.js";

const router = express.Router();

router.get("/getItems", getItems);
router.get("/getItems/:category", getItemsByCategory);

export default router;
