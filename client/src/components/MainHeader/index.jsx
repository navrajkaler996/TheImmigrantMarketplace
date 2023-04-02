import React, { useEffect, useState } from "react";
import Logo from "../../assets/Logo-1.png";
import SearchIcon from "../../assets/Search-icon.png";
import LoginIcon from "../../assets/Login-icon.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Hamburger from "../Hamburger";
import { logout, userMode } from "../../actions/userActions";
import Switch from "react-switch";

const MainHeader = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.users?.login);

  const [showDropdown, setShowDropdown] = useState(false);
  const [mode, setMode] = useState(
    userInfo?.userMode ? userInfo?.userMode : ""
  );

  useEffect(() => {}, [userInfo, location]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const changeHandler = (value) => {
    dispatch(userMode(value));
  };

  return (
    <div className="main-header" style={{ position: "relative" }}>
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
                  {userInfo?.type?.buy && userInfo?.type?.sell && (
                    <Link
                      to="/"
                      className="main-header__utilities--dropdown-list-item">
                      {" "}
                      <li className="main-header__utilities--dropdown-list-item-mode">
                        <label>
                          Buyer
                          <Switch
                            onChange={() => changeHandler("buyer")}
                            checked={userInfo?.userMode === "buyer"}
                            onColor="#590d22"
                            width={60}
                          />
                        </label>

                        <label>
                          Seller
                          <Switch
                            onChange={() => changeHandler("seller")}
                            checked={userInfo?.userMode === "seller"}
                            width={60}
                            onColor="#590d22"
                          />
                        </label>
                      </li>{" "}
                      <hr className="divider" />
                    </Link>
                  )}
                  {!userInfo?.type?.buy && userInfo?.type?.sell && (
                    <p
                      to="/"
                      className="main-header__utilities--dropdown-list-item">
                      {" "}
                      <li className="main-header__utilities--dropdown-list-item-mode">
                        Seller account
                      </li>{" "}
                      <hr className="divider" />
                    </p>
                  )}
                  {userInfo?.type?.buy && !userInfo?.type?.sell && (
                    <p
                      to="/"
                      className="main-header__utilities--dropdown-list-item">
                      {" "}
                      <li className="main-header__utilities--dropdown-list-item-mode">
                        Buyer account
                      </li>{" "}
                      <hr className="divider" />
                    </p>
                  )}

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
          <Link to="/login">
            {" "}
            <img src={LoginIcon} className="main-header__utilities--login" />
          </Link>
        )}
        <div className="main-header__utilities--hamburger">
          <Hamburger
            loggedIn={userInfo?.token ? true : false}
            userInfo={userInfo}
            logoutHandler={logoutHandler}
          />
        </div>
      </div>

      <div className="main-header__navigation main-header__navigation-1">
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
        style={{ width: "35rem" }}
        className="main-header__navigation main-header__navigation-logo"
      />

      <div className="main-header__navigation main-header__navigation-2">
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
      <div className="main-header__search-box">
        <img
          src={SearchIcon}
          className="main-header__search-box--search-icon"
        />
        <input
          type="text"
          className="main-header__search-box--search-bar"
          placeholder="Search here..."
        />
      </div>
    </div>
  );
};

export default MainHeader;
