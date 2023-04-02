import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Hamburger from "../Hamburger";
import Logo from "../../assets/Logo-1.png";
import { Link } from "react-router-dom";
import { logout } from "../../actions/userActions";

const SecondaryHeader = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.users?.login);

  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {}, [userInfo]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div
      className="main-header secondary-header"
      style={{ position: "relative" }}>
      <div className="main-header__utilities">
        {userInfo ? (
          <div className="main-header__utilities--container">
            <input
              type="button"
              className="main-header__utilities--logged-in"
              value={userInfo?.fullName ? `${userInfo?.fullName}` : ""}
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="main-header__utilities--dropdown">
                <ul className="main-header__utilities--dropdown-list">
                  <Link
                    to="/"
                    className="main-header__utilities--dropdown-list-item">
                    {" "}
                    <li>Profile</li>{" "}
                  </Link>
                  {userInfo?.userMode === "seller" && (
                    <Link
                      to="/dashboard"
                      className="main-header__utilities--dropdown-list-item">
                      <li>Dashboard</li>
                    </Link>
                  )}

                  <Link
                    to="/"
                    className="main-header__utilities--dropdown-list-item">
                    <li>Cart</li>
                  </Link>
                  <Link
                    to="/"
                    className="main-header__utilities--dropdown-list-item">
                    <li onClick={logoutHandler}>Log out</li>
                  </Link>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className=" main-header__utilities--login secondary-header--login">
            {" "}
            Login
          </Link>
        )}{" "}
        <div className="main-header__utilities--hamburger">
          <Hamburger
            loggedIn={userInfo?.token ? true : false}
            userInfo={userInfo}
            logoutHandler={logoutHandler}
          />
        </div>
      </div>

      <div className="main-header__navigation main-header__navigation-1 secondary-header--navigation">
        <Link className="navigation-text" to="/">
          Home
        </Link>
        <Link className="navigation-text" to="/items/mattresses">
          Mattresses
        </Link>
        <a className="navigation-text" href="#">
          Electronics
        </a>
        <Link className="navigation-text" to="/items/rentals">
          Rentals
        </Link>
      </div>

      {/* MAIN HEADER LOGO */}
      <img
        src={Logo}
        className="main-header__navigation main-header__navigation-logo secondary-header--logo"
      />

      <div className="main-header__navigation main-header__navigation-2 secondary-header--navigation">
        <a className="navigation-text" href="#">
          Vehicles
        </a>
        <a className="navigation-text" href="#">
          Beds
        </a>
        <a className="navigation-text" href="#">
          Clothing
        </a>
        <a className="navigation-text" href="#">
          sell
        </a>
      </div>

      <div className="main-header__navigation main-header__navigation-3">
        <Link className="navigation-text" to="/">
          Home
        </Link>
        <Link className="navigation-text" to="/items/mattresses">
          Mattresses
        </Link>
        <a className="navigation-text" href="#">
          Electronics
        </a>
        <Link className="navigation-text" to="/items/rentals">
          Rentals
        </Link>
        <a className="navigation-text" href="#">
          Vehicles
        </a>
        <a className="navigation-text" href="#">
          Beds
        </a>
        <a className="navigation-text" href="#">
          Clothing
        </a>
        <a className="navigation-text" href="#">
          sell
        </a>
      </div>
      {/* <div className="main-header__search-box">
        <img
          src={SearchIcon}
          className="main-header__search-box--search-icon"
        />
        <input
          type="text"
          className="main-header__search-box--search-bar"
          placeholder="Search here..."
        />
      </div> */}
    </div>
  );
};

export default SecondaryHeader;
