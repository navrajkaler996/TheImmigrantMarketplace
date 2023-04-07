import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatCurrent } from "../../../actions/chatActions";
import SalmanKhan from "../../../assets/salman-khan-2.jpeg";
import Chatbox from "./Chatbox";
import { io } from "socket.io-client";
import { useRef } from "react";

const Inbox = () => {
  const dispatch = useDispatch();

  const { login, chat } = useSelector((state) => state?.users);

  const { userInfo } = login;

  const { _id } = userInfo;

  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8800");
  }, []);

  useEffect(() => {
    dispatch(chatCurrent(_id));
  }, [_id]);

  useEffect(() => {
    socket.current.emit("addUser", userInfo._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [userInfo]);

  const getChats = () => {};

  return (
    <div className="inbox">
      <p className="secondary-heading"> Your messages</p>
      <hr className="divider" />
      <div className="inbox__container">
        <div className="inbox__list">
          {chat?.length > 0 &&
            chat.map((c) => {
              return (
                <div className="inbox__list-item">
                  <img src={SalmanKhan} className="inbox__list-item-image" />
                  <p className="inbox__list-item-name">Pavit singh</p>
                </div>
              );
            })}
        </div>
        <div className="inbox__chat">
          {chat?.currentChat?.length > 0 && (
            <Chatbox
              chatId={chat?.currentChat[0]?._id}
              chat={chat}
              socket={socket}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
