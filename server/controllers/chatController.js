import asyncHandler from "express-async-handler";
import { errorMessages } from "../constants.js";
import Chat from "../models/chatModel.js";

/////CREATE a new chat
//POST @ /api/chat/createNewChat
export const createNewChat = asyncHandler(async (req, res) => {
  try {
    const { senderId, recieverId } = req.body;

    if (senderId && recieverId) {
      // const chatExists = await Chat.find({
      //   members:
      // })

      const newChat = await Chat.create({
        members: [senderId, recieverId],
      });

      if (newChat) {
        res.status(201).json({
          message: "New chat created!",
        });
      }
    } else {
      res.status(400).send({
        message: errorMessages.USER_INVALID_DATA,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: errorMessages.POSTING_DATA,
    });

    throw new Error(error);
  }
});

/////FETCH chat(s) using user id
//GET @ /api/chat/getChat
export const getChat = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const chat = await Chat.find({
        members: { $in: [id] },
      });

      if (chat?.length > 0) {
        res.status(201).json(chat);
      } else {
        res.status(201).json({
          message: errorMessages.NO_CHAT_FOUND,
        });
      }
    } else {
      res.status(400).send({
        message: errorMessages.USER_INVALID_DATA,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: errorMessages.FETCHING_DATA,
    });

    throw new Error(error);
  }
});
