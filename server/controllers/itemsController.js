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

/////FETCHING ALL THE ITEMS by category
//GET @ /api/item/getItems/:category
export const getItemsByCategory = asyncHandler(async (req, res) => {
  try {
    let category = req.params.category;
    let items = await Item.find({ category: category });

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

/////FETCHING AN ITEM BY ID
//GET @ /api/item/getItems/:id
export const getItemById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  let item = await Item.findById({ _id: id });

  try {
    if (item) {
      res.status(201).json({ item });
    } else {
      res.status(201).json({ item });
    }
  } catch (error) {
    res.status(400).json({
      message: errorMessages.FETCHING_DATA,
    });

    throw new Error(error);
  }
});
