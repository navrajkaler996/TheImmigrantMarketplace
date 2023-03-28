import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AfterLogin = () => {
  const { login } = useSelector((state) => state.users);
  const { userInfo } = login;

  return (
    <div className="afterlogin-container">
      <p>Welcome, {userInfo.fullName} </p>
      <h1 className="primary-heading">Continue as:</h1>
      <div className="afterlogin-links">
        {" "}
        <Link className="afterlogin-link" to="/home">
          Buyer
        </Link>{" "}
        <Link className="afterlogin-link" to="/dashboard">
          Seller
        </Link>
      </div>
    </div>
  );
};

export default AfterLogin;
