import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { io } from "socket.io-client";
import { getSocketURL } from "../../utils/apiURL";

import Inbox from "./components/Inbox";
import ListingsForm from "./components/ListingsForm";
import YourListings from "./components/YourListings";

import SellerDashboardContext from "./SellerDashboardContext";

const SellerDashboard = () => {
  const { state } = useLocation();

  const { login, items } = useSelector((state) => state?.users);

  const { userInfo } = login;

  const [active, setActive] = useState("yourListings");

  const socket = useRef();

  //Connecting socket
  useEffect(() => {
    console.log("+++++", getSocketURL());
    socket.current = io(getSocketURL());

    // socket.current = io("ws://immigrantmarketplace.onrender.com");

    if (state?.active) setActive(state?.active);
  }, []);

  if (Object.keys(login)?.length == 0) {
    return (
      <div
        className="sellerdashboard-container"
        style={{ justifyContent: "center" }}>
        {" "}
        <p className="secondary-heading">
          Please <Link to="/login"> login </Link>
        </p>{" "}
      </div>
    );
  }

  const sellerToDo = (
    <>
      <li
        className="sellerdashboard__todo-link"
        id="yourListings"
        onClick={() => setActive("yourListings")}>
        Your listings
      </li>
      <li
        className="sellerdashboard__todo-link"
        id="addToListing"
        onClick={() => setActive("addToListing")}>
        Add a new listing
      </li>
      <li
        className="sellerdashboard__todo-link"
        id="inbox"
        onClick={() => setActive("inbox")}>
        Check inbox
      </li>
      <li>Friend list</li>
      <li>Edit your profile</li>
    </>
  );

  const buyerToDo = (
    <>
      <li
        className="sellerdashboard__todo-link"
        id="yourListings"
        onClick={() => setActive("yourBuys")}>
        Your buys
      </li>
      <li
        className="sellerdashboard__todo-link"
        id="addToListing"
        onClick={() => setActive("cart")}>
        Cart
      </li>
      <li
        className="sellerdashboard__todo-link"
        id="inbox"
        onClick={() => setActive("inbox")}>
        Check inbox
      </li>
      <li>Friend list</li>
      <li>Edit your profile</li>
    </>
  );

  return (
    <SellerDashboardContext.Provider value={{ userInfo, items, socket }}>
      <div className="sellerdashboard__container">
        <div className="sellerdashboard__listings">
          {active === "yourListings" && <YourListings />}

          {active === "addToListing" && <ListingsForm />}

          {active === "inbox" && <Inbox />}
        </div>

        <div className="sellerdashboard__todo">
          <ul>
            {userInfo?.userMode === "seller" && { ...sellerToDo }}
            {userInfo?.userMode === "buyer" && { ...buyerToDo }}
          </ul>
        </div>
      </div>
    </SellerDashboardContext.Provider>
  );
};

export default SellerDashboard;
