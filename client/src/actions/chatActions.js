import axios from "axios";
import {
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
