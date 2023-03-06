import asyncHandler from "express-async-handler";
import { errorMessages } from "../constants.js";
import Item from "../models/itemModel.js";

/////FETCHING ALL THE ITEMS
//GET @ /api/item/getItems
export const getItems = asyncHandler(async (req, res) => {
  try {
    let items = await Item.find();

    items = items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (req.body?.count !== -1) {
      const count = req.body.count;
      items = items.slice(0, count);
    }

    if (items) {
      res.status(201).json({
        items,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: errorMessages.FETCHING_DATA,
    });
    throw new Error(error);
  }
});
