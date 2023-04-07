import React from "react";
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { chatCurrent } from "../../../actions/chatActions";

import Chatbox from "./Chatbox";
import Conversation from "./Conversation";

import SellerDashboardContext from "../SellerDashboardContext";

const Inbox = () => {
  const dispatch = useDispatch();

  const { login, chats } = useSelector((state) => state?.users);

  const { userInfo } = login;

  const { _id } = userInfo;

  const { socket } = useContext(SellerDashboardContext);

  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState(null);

  useEffect(() => {
    dispatch(chatCurrent(_id));
  }, [_id]);

  //Adding and fetching connected users
  useEffect(() => {
    socket.current.emit("addUser", userInfo._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [userInfo]);

  return (
    <div className="inbox">
      <p className="secondary-heading"> Your messages</p>
      <hr className="divider" />
      <div className="inbox__container">
        <div className="inbox__list">
          {chats?.chatData?.users.length > 0 &&
            chats?.chatData?.users.map(
              (user) =>
                user._id !== userInfo._id && (
                  <Conversation
                    user={user}
                    chats={chats}
                    selectedChat={selectedChat}
                    setSelectedChat={setSelectedChat}
                    setSelectedChatId={setSelectedChatId}
                  />
                )
            )}
        </div>
        <div className="inbox__chat">
          {!selectedChat && (
            <p className="secondary-heading" style={{ marginTop: "50%" }}>
              Select a conversation
            </p>
          )}
          {selectedChatId && (
            <Chatbox chatId={selectedChatId} chats={chats} socket={socket} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
