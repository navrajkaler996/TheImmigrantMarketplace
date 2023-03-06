import axios from "axios";
import {
  ITEM_LIST_FAIL,
  ITEM_LIST_REQUEST,
  ITEM_LIST_SUCCESS,
} from "../utils/actionConstants";

export const itemList =
  (count = -1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ITEM_LIST_REQUEST, payload: { loading: true } });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = {
        count,
      };

      const { data } = await axios(
        "http://localhost:4000/api/item/getItems",
        body,
        config
      );

      dispatch({
        type: ITEM_LIST_SUCCESS,
        payload: {
          loading: false,
          list: data?.items,
        },
      });
    } catch (error) {
      dispatch({
        type: ITEM_LIST_FAIL,
        payload: {
          loading: false,
          error: error,
        },
      });
    }
  };
