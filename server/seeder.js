import mongoose from "mongoose";

import { userData } from "./data/userData.js";
import { itemData } from "./data/itemData.js";

import User from "./models/userModel.js";
import Item from "./models/itemModel.js";
import connectDB from "./config/db.js";

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Item.deleteMany();

    await User.insertMany(userData);
    await Item.insertMany(itemData);

    console.log("Data imported!");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Item.deleteMany();

    console.log("Data destroyed!");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  deleteData();
} else {
  importData();
}
