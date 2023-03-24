import axios from "axios";
import {
  ITEM_LIST_BY_CATEGORY_FAIL,
  ITEM_LIST_BY_CATEGORY_REQUEST,
  ITEM_LIST_BY_CATEGORY_SUCCESS,
  ITEM_LIST_BY_ID_FAIL,
  ITEM_LIST_BY_ID_REQUEST,
  ITEM_LIST_BY_ID_SUCCESS,
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

export const itemListByCategory = (category) => async (dispatch) => {
  try {
    dispatch({
      type: ITEM_LIST_BY_CATEGORY_REQUEST,
      payload: { loading: true },
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios(
      `http://localhost:4000/api/item/getItemsByCategory/${category}`,
      config
    );

    dispatch({
      type: ITEM_LIST_BY_CATEGORY_SUCCESS,
      payload: { loading: false, list: data?.items },
    });
  } catch (error) {
    dispatch({
      type: ITEM_LIST_BY_CATEGORY_FAIL,
      payload: {
        loading: false,
        error: error,
      },
    });
  }
};

export const itemListByID = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ITEM_LIST_BY_ID_REQUEST,
      payload: {
        loading: true,
      },
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios(
      `http://localhost:4000/api/item/getItemsById/${id}`,
      config
    );

    dispatch({
      type: ITEM_LIST_BY_ID_SUCCESS,
      payload: {
        loading: false,
        listItem: data?.item,
      },
    });
  } catch (error) {
    dispatch({
      type: ITEM_LIST_BY_ID_FAIL,
      payload: {
        loading: false,
        error: error,
      },
    });
  }
};
