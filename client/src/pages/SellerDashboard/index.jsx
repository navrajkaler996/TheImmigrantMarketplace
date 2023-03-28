import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ListingsForm from "./components/ListingsForm";

const SellerDashboard = () => {
  const [active, setActive] = useState("listings");
  return (
    <div className="sellerdashboard-container">
      <div className="sellerdashboard-listings">
        {active === "listings" && (
          <>
            <p className="secondary-heading">Your listings</p>
            <hr className="divider" />
            <p>Nothing to show</p>
          </>
        )}

        {active === "addToListing" && <ListingsForm />}
      </div>

      <div className="sellerdashboard-todo">
        <ul>
          <li className="sellerdashboard-todo__link">Your listings</li>
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
  );
};

export default SellerDashboard;
