import React from "react";
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { chatCurrent } from "../../../actions/chatActions";

import Chatbox from "./Chatbox";
import Conversation from "./Conversation";

import SellerDashboardContext from "../SellerDashboardContext";
import Spinner from "../../../components/Spinner";

const Inbox = () => {
  const dispatch = useDispatch();

  const { login, chats } = useSelector((state) => state?.users);

  const { loading } = chats;

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
    socket.current.on("getUsers", (users) => {});
  }, [userInfo]);

  useEffect(() => {}, [selectedChatId]);

  const changeHandler = (e) => {
    if (e.target?.value) {
      setSelectedChat(e.target.value);
      const { _id } = chats?.chatData?.conversations.find((ch) =>
        ch.members.includes(e.target.value)
      );

      setSelectedChatId(_id);
    }
  };

  return (
    <div className="inbox">
      <p className="secondary-heading"> Your messages</p>
      <hr className="divider" />
      <div className="inbox__container">
        {loading && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}>
            {" "}
            <Spinner color="#590d22" />{" "}
          </div>
        )}

        {!loading && (
          <>
            {/* Dropdown for mobile view */}
            <div className="create-account__form--input-container inbox__dropdown">
              <select
                className="create-account__form--input create-account__form--input-dropdown"
                onChange={(e) => changeHandler(e)}
                name="city"
                style={{ border: "1px solid #ccc" }}>
                <option value="" disabled selected hidden>
                  Select a conversion
                </option>
                {chats?.chatData?.users?.length > 0 &&
                  chats?.chatData?.users.map((user) => {
                    return (
                      user._id !== _id && (
                        <option value={user._id} name={user.fullName}>
                          {user.fullName}
                        </option>
                      )
                    );
                  })}
              </select>
            </div>

            {/* List for larger screeens */}
            <div className="inbox__list">
              {chats?.chatData?.users?.length > 0 &&
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

              {/* Chatbox where messages are displayed */}
              {selectedChatId && (
                <Chatbox
                  chatId={selectedChatId}
                  chats={chats}
                  socket={socket}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Inbox;
