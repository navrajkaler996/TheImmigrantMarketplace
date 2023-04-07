import mongoose from "mongoose";

const chatScehma = mongoose.Schema({
  members: {
    type: Array,
    required: true,
  },
  
});

const Chat = mongoose.model("Chat", chatScehma);

export default Chat;
