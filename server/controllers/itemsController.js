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
    items = items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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

/////FETCHING ITEMS BY SELLER EMAIL
//GET @ /api/item/getItemsByEmail
export const getItemsByEmail = asyncHandler(async (req, res) => {
  const email = req.params.email;

  let items = await Item.find({ sellerEmail: email });
  items = items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  try {
    if (items) {
      res.status(201).json({ items });
    } else {
      res.status(201).json({
        message: errorMessages.FETCHING_DATA,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: errorMessages.FETCHING_DATA,
    });

    throw new Error(error);
  }
});

/////INSERT AN ITEM
//POST @ /api/item/addItem
export const addItem = asyncHandler(async (req, res) => {
  const {
    itemName,
    type,
    price,
    utilities,
    address,
    postalCode,
    description,
    sellerName,
    sellerEmail,
    sellerMobile,
    category,
    images,
  } = req.body;

  let item = await Item.create({
    itemName,
    type,
    price,
    utilities,
    address,
    postalCode,
    description,
    sellerName,
    sellerEmail,
    sellerMobile,
    category,
    images,
  });
  try {
    if (item) {
      res.status(201).json({
        message: "Item inserted successfully",
      });
    } else {
      res.status(400).json({
        message: errorMessages.FETCHING_DATA,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: errorMessages.FETCHING_DATA,
    });

    throw new Error(error);
  }
});

/////FETCHING ALL THE ITEMS by category
//GET @ /api/item/getItems/:category
export const getItemsByCategoryForScroll = asyncHandler(async (req, res) => {
  try {
    let category = req.params.category;
    let pageNumber = req.params.pageNumber;
    let length = req.params.length;
    let items = await Item.find({ category: category })
      .sort({ createdAt: "-1" })
      .limit(11 * pageNumber + 1);

    if (items) {
      if (items.length == length) {
        console.log(length, items.length, length);
        res.status(201).json({
          items,
          noMore: true,
        });
      } else {
        res.status(201).json({
          items,
        });
      }
    }
  } catch (error) {
    res.status(400).send({
      message: errorMessages.FETCHING_DATA,
    });

    throw new Error(error);
  }
});
