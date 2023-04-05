import {
  MESSAGE_ADD_FAIL,
  MESSAGE_ADD_REQUEST,
  MESSAGE_ADD_SUCCESS,
  MESSAGE_LIST_FAIL,
  MESSAGE_LIST_REQUEST,
  MESSAGE_LIST_SUCCESS,
} from "../utils/actionConstants";

const initialState = {};

export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_LIST_REQUEST: {
      return {
        ...state,
        loading: action?.payload?.loading,
      };
    }

    case MESSAGE_LIST_SUCCESS: {
      return {
        ...state,
        loading: action?.payload?.loading,
        messages: action?.payload?.messages,
      };
    }

    case MESSAGE_LIST_FAIL: {
      return {
        ...state,
        loading: action?.payload?.loading,
        error: action?.payload?.error,
      };
    }

    case MESSAGE_ADD_REQUEST: {
      return {
        ...state,
        loading: action?.payload?.loading,
      };
    }

    case MESSAGE_ADD_SUCCESS: {
      return {
        ...state,
        loading: action?.payload?.loading,
        messageAdded: action?.payload?.messageAdded,
      };
    }

    case MESSAGE_ADD_FAIL: {
      return {
        ...state,
        loading: action?.payload?.loading,
        error: action?.payload?.error,
      };
    }

    default:
      return state;
  }
};
