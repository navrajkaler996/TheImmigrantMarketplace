import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAccount } from "../../actions/userActions";
import Spinner from "../../components/Spinner";
import { regex } from "../../utils/regexConstants";

const CreateAccount = () => {
  const dispatch = useDispatch();
  const { loading, userInfo } = useSelector(
    (state) => state?.users?.createAccount
  );
  const [form, setForm] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    password: "",
    city: "",
  });

  const [formErrors, setFormErrors] = useState({
    fullName: false,
    mobileNumber: false,
    email: false,
    password: false,
    city: false,
  });

  const [showToolTip, setShowToolTip] = useState({
    fullName: false,
    mobileNumber: false,
    email: false,
    password: false,
    city: false,
  });

  const [mainError, setMainError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    /////Redirecting to login page if account created successfully
    if (userInfo?.status === 201)
      return navigate("/login", {
        replace: true,
        state: {
          redirectedFrom: "createAccount",
        },
      });
  }, [userInfo]);

  /////Validators
  //Validating full name
  const validateFullName = (e) => {
    if (
      (e.target.value?.length < 2 || !e.target.value?.match(/^[A-Za-z\s]+$/)) &&
      e.target.value?.length > 0
    ) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: true,
      });
    } else {
      setFormErrors({
        ...formErrors,
        [e.target.name]: false,
      });
    }
  };
  //Validating email
  const validateEmail = (e) => {
    if (!e.target.value?.match(regex.EMAIL) && e.target.value?.length > 0) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: true,
      });
    } else {
      setFormErrors({
        ...formErrors,
        [e.target.name]: false,
      });
    }
  };
  //Validating mobile number
  const validateMobileNumber = (e) => {
    if (e.target.value?.length !== 10) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: true,
      });
    } else {
      setFormErrors({
        ...formErrors,
        [e.target.name]: false,
      });
    }
  };
  //Validating password
  const validatePassword = (e) => {
    if (!e.target.value?.match(regex.PASSWORD) && e.target.value?.length > 0) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: true,
      });
    } else {
      setFormErrors({
        ...formErrors,
        [e.target.name]: false,
      });
    }
  };
  //Validating city
  const validateCity = (e) => {};

  /////Display tool tip
  const toolTipHandler = (name) => {
    setShowToolTip({
      ...showToolTip,
      [name]: !showToolTip[name],
    });
  };

  const changeHandler = (e) => {
    if (mainError) setMainError(false);

    if (e.target.name === "fullName") validateFullName(e);
    if (e.target.name === "email") validateEmail(e);
    if (e.target.name === "mobileNumber") validateMobileNumber(e);
    if (e.target.name === "password") validatePassword(e);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = () => {
    if (
      formErrors.fullName ||
      formErrors.email ||
      formErrors.password ||
      formErrors.mobileNumber ||
      formErrors.city
    ) {
      setMainError(true);
    } else {
      dispatch(
        createAccount(
          form.fullName,
          form.mobileNumber,
          form.email,
          form.password,
          form.city
        )
      );
    }
  };

  return (
    <div className="create-account">
      <div className="create-account__container">
        {loading && <Spinner />}
        {!loading && (
          <>
            {" "}
            <h1 className="primary-heading" style={{ marginTop: "2rem" }}>
              Create account
            </h1>
            <div className="create-account__form">
              <div className="create-account__form--input-container">
                <label className="create-account__form--label">Full name</label>
                <input
                  type="text"
                  className="create-account__form--input"
                  placeholder="Enter fullname..."
                  name="fullName"
                  onChange={(e) => changeHandler(e)}
                />

                {/* Displaying error mark */}
                {formErrors.fullName && (
                  <span
                    className="error-cross"
                    name="fullName"
                    onMouseEnter={() => toolTipHandler("fullName")}
                    onMouseLeave={() => toolTipHandler("fullName")}>
                    X
                  </span>
                )}
                {showToolTip.fullName && (
                  <ul className="error-cross-tooltip">
                    <li>Name should have at least two characters.</li>
                    <li>No special characters or digits allowed.</li>
                  </ul>
                )}
              </div>
              <div className="create-account__form--input-container">
                <label className="create-account__form--label">
                  Mobile number
                </label>

                <input
                  type="number"
                  className="create-account__form--input"
                  placeholder="Enter mobile number..."
                  name="mobileNumber"
                  onChange={(e) => changeHandler(e)}
                />

                {/* Displaying error mark */}
                {formErrors.mobileNumber && (
                  <span
                    className="error-cross"
                    name="mobileNumber"
                    onMouseEnter={() => toolTipHandler("mobileNumber")}
                    onMouseLeave={() => toolTipHandler("mobileNumber")}>
                    X
                  </span>
                )}
                {showToolTip.mobileNumber && (
                  <ul className="error-cross-tooltip">
                    <li>Mobile number should have 10 digits.</li>
                  </ul>
                )}
              </div>
              <div className="create-account__form--input-container">
                <label className="create-account__form--label">Email</label>

                <input
                  type="text"
                  className="create-account__form--input"
                  placeholder="Enter email..."
                  name="email"
                  onChange={(e) => changeHandler(e)}
                />

                {/* Displaying error mark */}
                {formErrors.email && (
                  <span
                    className="error-cross"
                    name="email"
                    onMouseEnter={() => toolTipHandler("email")}
                    onMouseLeave={() => toolTipHandler("email")}>
                    X
                  </span>
                )}
                {showToolTip.email && (
                  <ul className="error-cross-tooltip">
                    <li>Please enter a valid email.</li>
                  </ul>
                )}
              </div>
              <div className="create-account__form--input-container">
                <label className="create-account__form--label">Password</label>

                <input
                  type="password"
                  className="create-account__form--input"
                  placeholder="Enter password..."
                  name="password"
                  onChange={(e) => changeHandler(e)}
                />

                {/* Displaying error mark */}
                {formErrors.password && (
                  <span
                    className="error-cross"
                    name="password"
                    onMouseEnter={() => toolTipHandler("password")}
                    onMouseLeave={() => toolTipHandler("password")}>
                    X
                  </span>
                )}
                {showToolTip.password && (
                  <ul className="error-cross-tooltip">
                    <li>Password should have atleast 3 characters.</li>
                    <li>Password should have atleast one special character.</li>
                    <li>
                      Password should have atleast one upper and lower case
                      character.
                    </li>
                  </ul>
                )}
              </div>
              <div className="create-account__form--input-container">
                <label className="create-account__form--label">City</label>
                <select
                  className="create-account__form--input create-account__form--input-dropdown"
                  onChange={(e) => changeHandler(e)}
                  name="city">
                  <option value="" disabled selected hidden>
                    Select a city
                  </option>
                  <option value="Winnipeg">Winnipeg</option>
                  <option value="Brandon">Brandon</option>
                  <option value="Thompson">Thompson</option>
                </select>
              </div>
              <div className="create-account__form--input-container">
                <input
                  type="submit"
                  className="create-account__form--input create-account__form--input-submit button-success"
                  disabled={
                    form.fullName?.length === 0 ||
                    form.email?.length === 0 ||
                    form.mobileNumber?.length === 0 ||
                    form.password?.length === 0 ||
                    form.city?.length === 0
                  }
                  onClick={submitHandler}
                />
                {mainError && (
                  <p className="create-account__form--main-error">
                    Please correct the errors
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateAccount;
