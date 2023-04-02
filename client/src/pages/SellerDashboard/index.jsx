import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ListingsForm from "./components/ListingsForm";
import YourListings from "./components/YourListings";
export const Context = createContext();

const SellerDashboard = () => {
  const [active, setActive] = useState("yourListings");
  const { login, items } = useSelector((state) => state?.users);
  const { userInfo } = login;

  const navigate = useNavigate();

  useEffect(() => {
    // if (Object.keys(login)?.length == 0) {
    //   return navigate("/home");
    // }
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
  if (userInfo?.userMode !== "seller") {
    return (
      <div className="sellerdashboard-container sellerdashboard-message">
        {" "}
        <p className="secondary-heading" style={{ textAlign: "center" }}>
          Please switch to seller mode to access the dashboard
        </p>{" "}
      </div>
    );
  }

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
