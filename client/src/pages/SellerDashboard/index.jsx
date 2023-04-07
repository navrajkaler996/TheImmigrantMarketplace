import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { io } from "socket.io-client";

import Inbox from "./components/Inbox";
import ListingsForm from "./components/ListingsForm";
import YourListings from "./components/YourListings";

import SellerDashboardContext from "./SellerDashboardContext";

const SellerDashboard = () => {
  const { login, items } = useSelector((state) => state?.users);
  const { userInfo } = login;

  const [active, setActive] = useState("yourListings");

  const socket = useRef();

  //Connecting socket
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
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
  // if (userInfo?.userMode !== "seller") {
  //   return (
  //     <div className="sellerdashboard-container sellerdashboard-message">
  //       {" "}
  //       <p className="secondary-heading" style={{ textAlign: "center" }}>
  //         Please switch to seller mode to access the dashboard
  //       </p>{" "}
  //     </div>
  //   );
  // }

  return (
    <SellerDashboardContext.Provider value={{ userInfo, items, socket }}>
      <div className="sellerdashboard-container">
        <div className="sellerdashboard-listings">
          {active === "yourListings" && <YourListings />}

          {active === "addToListing" && <ListingsForm />}

          {active === "inbox" && <Inbox />}
        </div>

        <div className="sellerdashboard-todo">
          <ul>
            <li
              className="sellerdashboard-todo__link"
              id="yourListings"
              onClick={() => setActive("yourListings")}>
              Your listings
            </li>
            <li
              className="sellerdashboard-todo__link"
              id="addToListing"
              onClick={() => setActive("addToListing")}>
              Add a new listing
            </li>
            <li
              className="sellerdashboard-todo__link"
              id="addToListing"
              onClick={() => setActive("inbox")}>
              Check inbox
            </li>
            <li>Friend list</li>
            <li>Edit your profile</li>
          </ul>
        </div>
      </div>
    </SellerDashboardContext.Provider>
  );
};

export default SellerDashboard;
