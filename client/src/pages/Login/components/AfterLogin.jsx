import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userMode } from "../../../actions/userActions";

const AfterLogin = () => {
  const dispatch = useDispatch();
  const { login } = useSelector((state) => state.users);
  const { userInfo } = login;

  const userModeHandler = (e) => {
    dispatch(userMode(e.target.id));
  };

  return (
    <div className="afterlogin-container">
      <p>Welcome, {userInfo.fullName} </p>
      <h1 className="primary-heading">Continue as:</h1>
      <div className="afterlogin-links">
        {" "}
        <Link
          className="afterlogin-link"
          to="/home"
          id="buyer"
          onClick={(e) => userModeHandler(e)}>
          Buyer
        </Link>{" "}
        <Link
          className="afterlogin-link"
          to="/dashboard"
          id="seller"
          onClick={(e) => userModeHandler(e)}>
          Seller
        </Link>
      </div>
    </div>
  );
};

export default AfterLogin;
