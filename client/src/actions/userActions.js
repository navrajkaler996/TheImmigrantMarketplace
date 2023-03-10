import axios from "axios";
import {
  USER_CREATE_ACCOUNT_FAIL,
  USER_CREATE_ACCOUNT_REQUEST,
  USER_CREATE_ACCOUNT_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../utils/actionConstants";

export const createAccount =
  (fullName, mobileNumber, email, password, city) => async (dispatch) => {
    try {
      dispatch({
        type: USER_CREATE_ACCOUNT_REQUEST,
        payload: { loading: true },
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = { fullName, mobileNumber, email, password, city };

      const { data } = await axios.post(
        "http://localhost:4000/api/user/createaccount",
        body,
        config
      );

      dispatch({
        type: USER_CREATE_ACCOUNT_SUCCESS,
        payload: { loading: false, data: data },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: USER_CREATE_ACCOUNT_FAIL,
        payload: { loading: false, error: error?.response?.data?.message },
      });
    }
  };

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
      payload: { loading: true },
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const body = { email, password };

    const { data } = await axios.post(
      "http://localhost:4000/api/user/login",
      body,
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    /////Saving user info in the local storage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: {
        loading: false,
        error: error?.response?.data?.message,
      },
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
    payload: {
      loading: false,
      data: {},
    },
  });

  /////removing user info from the local storage
  localStorage.removeItem("userInfo");

  document.location.href = "/login";
};
