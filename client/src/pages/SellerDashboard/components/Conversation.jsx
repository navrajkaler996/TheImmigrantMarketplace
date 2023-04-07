import React from "react";
import SalmanKhan from "../../../assets/salman-khan-2.jpeg";
const Conversation = ({
  user,
  chats,
  selectedChat,
  setSelectedChat,
  setSelectedChatId,
}) => {
  const handleChat = (selectedId) => {
    setSelectedChat(selectedId);
    const { _id } = chats.chatData.conversations.find((ch) =>
      ch.members.includes(selectedId)
    );

    setSelectedChatId(_id);
  };
  return (
    <div
      className="conversation"
      key={user._id}
      onClick={(e) => handleChat(user._id)}
      style={
        selectedChat === user._id
          ? {
              backgroundImage:
                "linear-gradient(to right, #590d22, #a4133c , #590d22",
              color: "#fff",
            }
          : {}
      }>
      <img src={SalmanKhan} className="conversation__image" />
      <p className="conversation__name">{user.fullName}</p>
    </div>
  );
};

export default Conversation;
