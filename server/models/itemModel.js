import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  utilities: {
    type: Object,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sellerName: {
    type: String,
    required: true,
  },
  sellerEmail: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
