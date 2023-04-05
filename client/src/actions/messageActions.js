import axios from "axios";
import {
  MESSAGE_ADD_FAIL,
  MESSAGE_ADD_REQUEST,
  MESSAGE_ADD_SUCCESS,
  MESSAGE_LIST_FAIL,
  MESSAGE_LIST_REQUEST,
  MESSAGE_LIST_SUCCESS,
} from "../utils/actionConstants";

export const messageList = (id) => async (dispatch) => {
  try {
    dispatch({ type: MESSAGE_LIST_REQUEST, payload: { loading: true } });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      `http://localhost:4000/api/message/getMessages/${id}`,
      config
    );

    dispatch({
      type: MESSAGE_LIST_SUCCESS,
      payload: {
        loading: false,
        messages: data,
      },
    });
  } catch (error) {
    dispatch({
      type: MESSAGE_LIST_FAIL,
      payload: {
        loading: false,
        error: error,
      },
    });
  }
};

export const messageAdd = (chatId, sender, text) => async (dispatch) => {
  try {
    dispatch({ type: MESSAGE_ADD_REQUEST, payload: { loading: true } });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const body = {
      chatId,
      sender,
      text,
    };

    const { data } = await axios.post(
      `http://localhost:4000/api/message/addMessage`,
      body,
      config
    );

    dispatch({
      type: MESSAGE_ADD_SUCCESS,
      payload: {
        loading: false,
        messageAdded: data,
      },
    });
  } catch (error) {
    dispatch({
      type: MESSAGE_ADD_FAIL,
      payload: {
        loading: false,
        error: error,
      },
    });
  }
};
