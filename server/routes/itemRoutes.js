import express from "express";
import {
  getItems,
  getItemsByCategory,
  getItemById,
  addItem,
  getItemsByEmail,
  getItemsByCategoryForScroll,
} from "../controllers/itemsController.js";

const router = express.Router();

router.get("/getItems", getItems);
router.get("/getItemsByCategory/:category", getItemsByCategory);
router.get("/getItemsById/:id", getItemById);
router.post("/addItem", addItem);
router.get("/getItemsByEmail/:email", getItemsByEmail);
router.get(
  "/getItemsByCategoryForScroll/:category/:pageNumber/:length",
  getItemsByCategoryForScroll
);
export default router;
