import asyncHandler from "express-async-handler";
import { errorMessages } from "../constants.js";
import Chat from "../models/chatModel.js";
import User from "../models/userModel.js";

/////CREATE a new chat
//POST @ /api/chat/createNewChat
export const createNewChat = asyncHandler(async (req, res) => {
  try {
    const { senderId, sellerEmail } = req.body;

    const user = await User.findOne({ email: sellerEmail });

    let recieverId;
    if (user) {
      recieverId = user._id.toString();
    }

    if (senderId && recieverId) {
      const chatExists = await Chat.find({
        members: [senderId, recieverId],
      });

      if (chatExists?.length === 0) {
        const newChat = await Chat.create({
          members: [senderId, recieverId],
          names: {},
        });

        if (newChat) {
          res.status(201).json({
            newChat: newChat,
          });
        }
      } else {
        res.status(201).send({
          newChat: chatExists,
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
      let chat = await Chat.find({
        members: { $in: [id] },
      });

      if (chat?.length > 0) {
        let members = chat.map((c) => c.members);
        members = [...new Set(members.flat())];

        const users = await User.find(
          {
            _id: { $in: [...members] },
          },
          { fullName: 1 }
        );

        if (users?.length > 0) {
          let chatWithNames = {
            conversations: chat,
            users,
          };
          res.status(201).json(chatWithNames);
        }
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
