import React, { createContext, useContext } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ListingsForm from "./components/ListingsForm";
import YourListings from "./components/YourListings";
export const Context = createContext();

const SellerDashboard = () => {
  const [active, setActive] = useState("yourListings");
  const { login, items } = useSelector((state) => state?.users);
  const { userInfo } = login;

  return (
    <Context.Provider value={{ userInfo, items }}>
      <div className="sellerdashboard-container">
        <div className="sellerdashboard-listings">
          {active === "yourListings" && <YourListings />}

          {active === "addToListing" && <ListingsForm />}
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
            <li>Check inbox</li>
            <li>Friend list</li>
            <li>Edit your profile</li>
          </ul>
        </div>
      </div>
    </Context.Provider>
  );
};

export default SellerDashboard;
