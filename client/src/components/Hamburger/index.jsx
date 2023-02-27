import React from "react";
import { NavLink } from "react-router-dom";

const Hamburger = ({ loggedIn = false, userInfo, logoutHandler }) => {
  return (
    <div className="navigation">
      <input
        type="checkbox"
        className="navigation__checkbox"
        id="navi-toggle"
      />
      <label htmlFor="navi-toggle" className="navigation__button">
        <span className="navigation__icon">&nbsp;</span>
      </label>
      <div className="navigation__background">&nbsp;</div>
      <nav className="navigation__nav">
        <ul className="navigation__list">
          {loggedIn && (
            <li className="navigation__item">
              <span className="navigation__link navigation__link2">
                Welcome, {userInfo?.fullName}
              </span>
            </li>
          )}
          <li className="navigation__item">
            <a href="#" className="navigation__link">
              {" "}
              Home
            </a>
          </li>
          <li className="navigation__item">
            <a href="#" className="navigation__link">
              Mattress
            </a>
          </li>
          <li className="navigation__item">
            <a href="#" className="navigation__link">
              Electronics
            </a>
          </li>
          <li className="navigation__item">
            <a href="#" className="navigation__link">
              Rentals
            </a>
          </li>
          <li className="navigation__item">
            <a href="#" className="navigation__link">
              Vehicles
            </a>
          </li>
          <li className="navigation__item">
            <a href="#" className="navigation__link">
              Beds
            </a>
          </li>
          <li className="navigation__item">
            <a href="#" className="navigation__link">
              Clothing
            </a>
          </li>
          <li className="navigation__item">
            <a href="#" className="navigation__link">
              Categories
            </a>
          </li>
          {!loggedIn ? (
            <li className="navigation__item">
              <NavLink
                to="/login"
                className="navigation__link navigation__link2">
                Login
              </NavLink>
              <hr className="navigation__divider" />

              <NavLink
                to="/register"
                className="navigation__link navigation__link2">
                Create an account
              </NavLink>
            </li>
          ) : (
            <li className="navigation__item">
              <NavLink
                to="/profile"
                className="navigation__link navigation__link2">
                Profile
              </NavLink>

              <hr className="navigation__divider" />
              <NavLink
                className="navigation__link navigation__link2"
                onClick={logoutHandler}>
                Logout
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Hamburger;
