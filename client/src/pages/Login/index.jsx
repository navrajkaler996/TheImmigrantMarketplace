import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login, userMode } from "../../actions/userActions";
import Logo from "../../assets/Logo-1.png";
import Spinner from "../../components/Spinner";
import { regex } from "../../utils/regexConstants";
import AfterLogin from "./components/AfterLogin";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { loading, userInfo, error } = useSelector(
    (state) => state?.users?.login
  );

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false,
  });

  const [showToolTip, setShowToolTip] = useState({
    email: false,
  });

  const [mainError, setMainError] = useState(false);

  useEffect(() => {
    // if (userInfo && Object.keys(userInfo)?.length > 0) {
    //   alert(`User ${userInfo?.fullName} successfully logged in!`);
    //   return navigate("/home");
    // }
  }, [userInfo]);

  useEffect(() => {
    setForm({
      email: "",
      password: "",
    });
  }, [error]);

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

  //Validating password
  const validatePassword = (e) => {
    if (e.target.value?.length > 3) {
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

  /////Display tool tip
  const toolTipHandler = (name) => {
    setShowToolTip({
      ...showToolTip,
      [name]: !showToolTip[name],
    });
  };

  const changeHandler = (e) => {
    if (mainError) setMainError(false);

    if (e.target.name === "email") validateEmail(e);
    if (e.target.password === "password") validatePassword(e);

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = () => {
    if (formErrors.email || formErrors.password) {
      setMainError(true);
    } else {
      dispatch(login(form.email, form.password));
    }
  };

  if (userInfo && Object.keys(userInfo)?.length > 0 && userInfo) {
    if (!userInfo?.type?.sell && userInfo?.type?.buy) {
      dispatch(userMode("buyer"));
      return navigate("/home");
    }

    if (userInfo?.type?.sell && !userInfo?.type?.buy) {
      dispatch(userMode("seller"));
      return navigate("/dashboard");
    }

    return (
      <div className="create-account">
        <div
          className="create-account__container"
          style={{ justifyContent: "start" }}>
          {userInfo?.type?.sell && userInfo?.type?.buy && <AfterLogin />}
        </div>
      </div>
    );
  }

  return (
    <div className="create-account">
      <div className="create-account__container">
        {loading && <Spinner />}
        {!loading && (
          <>
            {location?.state?.redirectedFrom === "createAccount" && (
              <p className="login-redirectedFrom-message">
                Account created successfully | Please login
              </p>
            )}

            <h1 className="primary-heading">Login</h1>
            <div className="create-account__form">
              <div
                className="create-account__form--input-container"
                style={{ marginBottom: "0rem" }}>
                <div className="create-account__form--input-container">
                  <label className="create-account__form--label">
                    Email or mobile number
                  </label>
                  <input
                    type="text"
                    className="create-account__form--input"
                    placeholder="Enter email"
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
              </div>
              <div
                className="create-account__form--input-container"
                style={{ marginBottom: "0rem" }}>
                <div className="create-account__form--input-container">
                  <label className="create-account__form--label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="create-account__form--input"
                    placeholder="Enter password..."
                    name="password"
                    onChange={(e) => changeHandler(e)}
                  />
                </div>
              </div>
              <div
                className="create-account__form--input-container"
                style={{ marginBottom: "0rem" }}>
                <input
                  type="sumbit"
                  className="create-account__form--input create-account__form--input-submit button-success"
                  value="Login"
                  style={{ textAlign: "center" }}
                  disabled={
                    form.email?.length === 0 || form.password?.length === 0
                  }
                  onClick={submitHandler}
                />
                <div className="login-links">
                  <span className="login-links-1">Forgot password</span>

                  <span
                    className="login-links-2"
                    onClick={() =>
                      navigate("/register", {
                        replace: true,
                        state: {
                          redirectedFrom: null,
                        },
                      })
                    }>
                    create an account
                  </span>
                </div>
                {error && (
                  <p className="create-account__form--main-error">{error}</p>
                )}
              </div>
              <div className="login-image-container">
                <img src={Logo} style={{ width: "35rem" }} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
