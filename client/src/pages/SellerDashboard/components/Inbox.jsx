import React from "react";
import { useState } from "react";
import SalmanKhan from "../../../assets/salman-khan-2.jpeg";

const Inbox = () => {
  const [clicked, setClicked] = useState();
  const messages = [
    {
      user: "Pavit",
      message: "Hi",
      host: true,
    },
    {
      user: "Avneet",
      message: "Hi",
    },
    {
      user: "Pavit",
      message: "Hi",
      host: true,
    },
    {
      user: "Avneet",
      message: "Hi",
    },
    {
      user: "Pavit",
      message: "Hi",
      host: true,
    },
    {
      user: "Pavit",
      message: "Hi",
      host: true,
    },
    {
      user: "Avneet",
      message: "Hi",
    },
    {
      user: "Pavit",
      message: "Hi",
      host: true,
    },
    {
      user: "Avneet",
      message: "Hi",
    },
    {
      user: "Pavit",
      message: "Hi",
      host: true,
    },
    {
      user: "Pavit",
      message: "Hi",
      host: true,
    },
    {
      user: "Avneet",
      message: "Hi",
    },
  ];
  return (
    <div className="inbox">
      <p className="secondary-heading"> Your messages</p>
      <hr className="divider" />
      <div className="inbox__container">
        <div className="inbox__list">
          <div className="inbox__list-item">
            <img src={SalmanKhan} className="inbox__list-item-image" />
            <p className="inbox__list-item-name">Pavit singh</p>
          </div>
        </div>
        <div className="inbox__chat">
          <div className="inbox__chatbox">
            <div className="inbox__chatbox-item">
              <img src={SalmanKhan} className="inbox__chatbox-item-image" />
              <div className="inbox__chatbox-item-container">
                <p className="inbox__chatbox-item-text">Hi</p>
              </div>
            </div>
            <div className="inbox__chatbox-item i">
              <div className="inbox__chatbox-item-container inbox__chatbox-item-container-user">
                <p className="inbox__chatbox-item-text">Hi there</p>
              </div>
            </div>
          </div>
          {/* <div className="inbox__chatbox">
            
          </div> */}
          <div className="inbox__input-container">
            <input
              type="text"
              className="create-account__form--input listings-form--input-dropdown form-container-rentals--input"
              placeholder="Type..."
              name="message"
            />
            <button className="inbox__button create-account__form--input create-account__form--input-submit button-success">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
