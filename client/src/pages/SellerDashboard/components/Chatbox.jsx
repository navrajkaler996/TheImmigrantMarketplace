import React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { messageAdd, messageList } from "../../../actions/messageActions";

import Spinner from "../../../components/Spinner";

import SalmanKhan from "../../../assets/salman-khan-2.jpeg";

import { getRecieverId } from "../helper";

const Chatbox = ({ chatId, chats, socket }) => {
  const dispatch = useDispatch();

  const { messages, login } = useSelector((state) => state?.users);
  const { userInfo } = login;
  const { totalMessages, messageAdded, loading } = messages;

  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMesssage] = useState("");

  const bottom = useRef(null);

  //Receiving message
  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setArrivalMesssage({ chatId, senderId: data.senderId, text: data.text });
    });
  }, []);

  //Automatic scroll to the bottom
  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [totalMessages]);

  useEffect(() => {
    dispatch(messageList(chatId));
  }, [chatId, messageAdded, arrivalMessage]);

  const changeHandler = (e) => {
    setNewMessage(e.target.value);
  };

  const sendMessageHandler = (e) => {
    e.preventDefault();
    if (newMessage?.length > 0) {
      dispatch(messageAdd(chatId, userInfo._id, newMessage));
      //Extracting recieverId
      const recieverId = getRecieverId(chats, chatId, userInfo._id);

      //Using recieverId to send the message
      if (recieverId) {
        socket.current.emit("sendMessage", {
          senderId: userInfo._id,
          recieverId: recieverId,
          text: newMessage,
        });
      }
      setNewMessage("");
    }
  };

  return (
    <>
      <div className="chatbox">
        {loading && !totalMessages && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "20rem",
            }}>
            {" "}
            <Spinner color="#590d22" />{" "}
          </div>
        )}

        {totalMessages?.length > 0 &&
          totalMessages?.map((m) => {
            if (m.sender === userInfo._id) {
              return (
                <div className="chatbox__item">
                  <div className="chatbox__item-container chatbox__item-container-host">
                    <p className="chatbox__item-text">{m.text}</p>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="chatbox__item">
                  <img src={SalmanKhan} className="chatbox__item-image" />
                  <div className="chatbox__item-container">
                    <p className="chatbox__item-text">{m.text}</p>
                  </div>
                </div>
              );
            }
          })}
        <div ref={bottom}></div>
      </div>

      <form className="chatbox__input-container" onSubmit={sendMessageHandler}>
        <input
          type="text"
          className="create-account__form--input listings-form--input-dropdown form-container-rentals--input"
          placeholder="Type..."
          name="message"
          value={newMessage}
          onChange={(e) => changeHandler(e)}
        />
        <button
          type="submit"
          className="chatbox__button create-account__form--input create-account__form--input-submit button-success">
          Send
        </button>
      </form>
    </>
  );
};

export default Chatbox;
