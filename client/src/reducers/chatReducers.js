import {
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
        currentChat: action?.payload?.currentChat,
      };
    }

    case CHAT_CURRENT_FAIL: {
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
