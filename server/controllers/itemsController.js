import asyncHandler from "express-async-handler";
import { errorMessages } from "../constants.js";
import Item from "../models/itemModel.js";

/////FETCHING ALL THE ITEMS
//GET @ /api/item/getItems
export const getItems = asyncHandler(async (req, res) => {
  try {
    const items = await Item.find();

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
