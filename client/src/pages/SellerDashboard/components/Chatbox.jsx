import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { messageAdd, messageList } from "../../../actions/messageActions";
import SalmanKhan from "../../../assets/salman-khan-2.jpeg";
import { io } from "socket.io-client";
import { useRef } from "react";

const Chatbox = ({ chatId, chat, socket }) => {
  const dispatch = useDispatch();
  const { message, login } = useSelector((state) => state?.users);
  const { userInfo } = login;
  const { messages, messageAdded } = message;

  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMesssage] = useState("");
  const bottom = useRef(null);
  useEffect(() => {
    dispatch(messageList(chatId));
    console.log("3333");
  }, [chatId, messageAdded, arrivalMessage]);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setArrivalMesssage({ chatId, senderId: data.senderId, text: data.text });
      // dispatch(messageList(chatId));
    });
  }, []);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // useEffect(() => {
  //   dispatch(messageAdd(chatId, arrivalMessage.senderId, arrivalMessage.text));
  // }, [arrivalMessage]);

  const changeHandler = (e) => {
    setNewMessage(e.target.value);
  };

  const getRecieverId = (id) => {
    const currentChat = chat?.currentChat?.find((c) => c._id === chatId);

    const recieverId = currentChat?.members?.find((i) => i !== id);

    return recieverId;
  };

  const sendMessageHandler = () => {
    if (newMessage?.length > 0) {
      dispatch(messageAdd(chatId, userInfo._id, newMessage));

      const recieverId = getRecieverId(userInfo._id);

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
      <div className="inbox__chatbox">
        {messages?.length > 0 &&
          messages?.map((m) => {
            if (m.sender === userInfo._id) {
              return (
                <div className="inbox__chatbox-item i">
                  <div className="inbox__chatbox-item-container inbox__chatbox-item-container-user">
                    <p className="inbox__chatbox-item-text">{m.text}</p>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="inbox__chatbox-item">
                  <img src={SalmanKhan} className="inbox__chatbox-item-image" />
                  <div className="inbox__chatbox-item-container">
                    <p className="inbox__chatbox-item-text">{m.text}</p>
                  </div>
                </div>
              );
            }
          })}
        <div ref={bottom}></div>
      </div>

      <div className="inbox__input-container">
        <input
          type="text"
          className="create-account__form--input listings-form--input-dropdown form-container-rentals--input"
          placeholder="Type..."
          name="message"
          value={newMessage}
          onChange={(e) => changeHandler(e)}
        />
        <button
          className="inbox__button create-account__form--input create-account__form--input-submit button-success"
          onClick={sendMessageHandler}>
          Send
        </button>
      </div>
    </>
  );
};

export default Chatbox;

// <div className="message">
//   <img src={SalmanKhan} className="message__image" />
//   <div className="message__container">
//     <p className="message__text">Hi</p>
//   </div>
// </div>
