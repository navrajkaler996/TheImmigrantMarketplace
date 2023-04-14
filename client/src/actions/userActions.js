import axios from "axios";
import {
  USER_CREATE_ACCOUNT_CLEAR,
  USER_CREATE_ACCOUNT_FAIL,
  USER_CREATE_ACCOUNT_REQUEST,
  USER_CREATE_ACCOUNT_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_MODE,
} from "../utils/actionConstants";
import { getBaseURL } from "../utils/apiURL";

export const createAccount =
  (fullName, mobileNumber, email, password, city, type) => async (dispatch) => {
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
      const body = { fullName, mobileNumber, email, password, city, type };

      const { data } = await axios.post(
        `${getBaseURL()}/api/user/createaccount`,
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
      `${getBaseURL()}/api/user/login`,
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

export const createAccountClear = () => async (dispatch) => {
  dispatch({
    type: USER_CREATE_ACCOUNT_CLEAR,
    payload: {
      loading: false,
      data: {},
    },
  });
};

export const userMode = (mode) => async (dispatch) => {
  dispatch({
    type: USER_MODE,
    payload: {
      data: mode,
    },
  });
  let temp = JSON.parse(localStorage.getItem("userInfo"));
  temp.userMode = mode;

  localStorage.setItem("userInfo", JSON.stringify(temp));
};
