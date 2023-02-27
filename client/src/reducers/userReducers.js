import {
  USER_CREATE_ACCOUNT_FAIL,
  USER_CREATE_ACCOUNT_REQUEST,
  USER_CREATE_ACCOUNT_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../utils/actionConstants";

const userInfo =
  localStorage.getItem("userInfo")?.length > 0 &&
  JSON.parse(localStorage.getItem("userInfo"));

export const userCreateAccountReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CREATE_ACCOUNT_REQUEST: {
      return {
        ...state,
        loading: action.payload?.loading,
      };
    }

    case USER_CREATE_ACCOUNT_SUCCESS: {
      return {
        ...state,
        loading: action.payload?.loading,
        userInfo: action.payload?.data,
      };
    }

    case USER_CREATE_ACCOUNT_FAIL: {
      return {
        ...state,
        loading: action.payload?.loading,
        error: action.payload?.error,
      };
    }

    default:
      return state;
  }
};

export const userLoginReducer = (
  state = userInfo ? { userInfo } : {},
  action
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST: {
      return {
        ...state,
        loading: action.payload?.loading,
      };
    }

    case USER_LOGIN_SUCCESS: {
      return {
        ...state,
        loading: action.payload?.loading,
        userInfo: action.payload?.data,
      };
    }

    case USER_LOGIN_FAIL: {
      return {
        ...state,
        loading: action.payload?.loading,
        error: action.payload?.error,
      };
    }

    case USER_LOGOUT: {
      return {};
    }

    default:
      return state;
  }
};
