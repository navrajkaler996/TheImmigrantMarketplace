import asyncHandler from "express-async-handler";
import { errorMessages } from "../constants.js";
import Message from "../models/messageModel.js";

/////ADD message to a chat using chatId, sender (sender's id), and text
//POST @ /api/message/addMessage
export const addMessage = asyncHandler(async (req, res) => {
  try {
    const { chatId, sender, text } = req.body;

    if (chatId && sender && text) {
      const message = await Message.create({ chatId, sender, text });

      if (message) {
        res.status(201).json(message);
      }
    }
  } catch (error) {
    res.status(400).send({
      message: errorMessages.POSTING_DATA,
    });

    throw new Error(error);
  }
});

/////FETCH messages of a particular chat using chatId
//GET @ /api/message/getMessages
export const getMessages = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    const messages = await Message.find({
      chatId: id,
    });

    if (messages) {
      res.status(201).json(messages);
    }
  } catch (error) {
    res.status(400).send({
      message: errorMessages.FETCHING_DATA,
    });

    throw new Error(error);
  }
});
