import axios from "axios";
import {
  CHAT_CLEAR,
  CHAT_CREATE_FAIL,
  CHAT_CREATE_REQUEST,
  CHAT_CREATE_SUCCESS,
  CHAT_CURRENT_FAIL,
  CHAT_CURRENT_REQUEST,
  CHAT_CURRENT_SUCCESS,
} from "../utils/actionConstants";
import { getBaseURL } from "../utils/apiURL";

export const chatCurrent = (id) => async (dispatch) => {
  try {
    dispatch({ type: CHAT_CURRENT_REQUEST, payload: { loading: true } });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${getBaseURL()}/api/chat/getChat/${id}`,
      config
    );

    dispatch({
      type: CHAT_CURRENT_SUCCESS,
      payload: {
        loading: false,
        chatData: data,
      },
    });
  } catch (error) {
    dispatch({
      type: CHAT_CURRENT_FAIL,
      payload: {
        loading: false,
        error: error,
      },
    });
  }
};

export const chatCreate = (senderId, sellerEmail) => async (dispatch) => {
  try {
    dispatch({
      type: CHAT_CREATE_REQUEST,
      payload: {
        loading: true,
      },
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const body = {
      senderId,
      sellerEmail,
    };
    const { data } = await axios.post(
      `${getBaseURL()}/api/chat/createNewChat`,
      body,
      config
    );

    dispatch({
      type: CHAT_CREATE_SUCCESS,
      payload: {
        loading: false,
        chatOnContact: data,
      },
    });
  } catch (error) {
    dispatch({
      type: CHAT_CREATE_FAIL,
      payload: {
        loading: false,
        error: error,
      },
    });
  }
};

export const chatClear = () => async (dispatch, getState) => {
  let chats = getState?.users?.chats;
  delete chats?.chatOnContact;
  dispatch({
    type: CHAT_CLEAR,
    payload: {
      modifiedChats: chats,
    },
  });
};
