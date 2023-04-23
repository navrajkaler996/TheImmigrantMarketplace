import {
  CHAT_CLEAR,
  CHAT_CREATE_FAIL,
  CHAT_CREATE_REQUEST,
  CHAT_CREATE_SUCCESS,
  CHAT_CURRENT_FAIL,
  CHAT_CURRENT_REQUEST,
  CHAT_CURRENT_SUCCESS,
} from "../utils/actionConstants";

const initialState = {};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_CURRENT_REQUEST: {
      return {
        ...state,
        loading: action?.payload?.loading,
      };
    }

    case CHAT_CURRENT_SUCCESS: {
      return {
        ...state,
        loading: action?.payload?.loading,
        chatData: action?.payload?.chatData,
      };
    }

    case CHAT_CURRENT_FAIL: {
      return {
        ...state,
        loading: action?.payload?.loading,
        error: action?.payload?.error,
      };
    }

    case CHAT_CREATE_REQUEST: {
      return {
        ...state,
        loading: action?.payload?.loading,
      };
    }

    case CHAT_CREATE_SUCCESS: {
      return {
        ...state,
        loading: action?.payload?.loading,
        chatOnContact: action?.payload?.chatOnContact,
      };
    }

    case CHAT_CREATE_FAIL: {
      return {
        ...state,
        loading: action?.payload?.loading,
        error: action?.payload?.error,
      };
    }

    case CHAT_CLEAR: {
      return {};
    }

    default:
      return state;
  }
};
