import express from "express";
import {
  getItems,
  getItemsByCategory,
  getItemById,
} from "../controllers/itemsController.js";

const router = express.Router();

router.get("/getItems", getItems);
router.get("/getItemsByCategory/:category", getItemsByCategory);
router.get("/getItemsById/:id", getItemById);

export default router;
