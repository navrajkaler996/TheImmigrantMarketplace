import axios from "axios";
import {
  ITEM_ADD_CLEAR,
  ITEM_ADD_FAIL,
  ITEM_ADD_REQUEST,
  ITEM_ADD_SUCCESS,
  ITEM_LIST_BY_CATEGORY_FAIL,
  ITEM_LIST_BY_CATEGORY_REQUEST,
  ITEM_LIST_BY_CATEGORY_SUCCESS,
  ITEM_LIST_BY_EMAIL_FAIL,
  ITEM_LIST_BY_EMAIL_REQUEST,
  ITEM_LIST_BY_EMAIL_SUCCESS,
  ITEM_LIST_BY_ID_FAIL,
  ITEM_LIST_BY_ID_REQUEST,
  ITEM_LIST_BY_ID_SUCCESS,
  ITEM_LIST_FAIL,
  ITEM_LIST_REQUEST,
  ITEM_LIST_SUCCESS,
  USER_CREATE_ACCOUNT_CLEAR,
} from "../utils/actionConstants";
import { getBaseURL } from "../utils/apiURL";

console.log("+++++", getBaseURL());

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
        `${getBaseURL()}/api/item/getItems`,
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
      `${getBaseURL()}/api/item/getItemsByCategory/${category}`,
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
      `${getBaseURL()}/api/item/getItemsById/${id}`,
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

export const itemAdd = (body) => async (dispatch) => {
  try {
    dispatch({
      type: ITEM_ADD_REQUEST,
      payload: {
        loading: true,
        message: "",
      },
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${getBaseURL()}/api/item/addItem`,
      body,
      config
    );

    dispatch({
      type: ITEM_ADD_SUCCESS,
      payload: {
        loading: false,
        message: data,
      },
    });
  } catch (error) {
    dispatch({
      type: ITEM_ADD_FAIL,
      payload: {
        loading: false,
        error: error,
      },
    });
  }
};

export const itemAddClear = () => async (dispatch) => {
  dispatch({
    type: ITEM_ADD_CLEAR,
    payload: {
      loading: false,
      data: {},
    },
  });
};

export const itemListByEmail = (email) => async (dispatch) => {
  try {
    dispatch({
      type: ITEM_LIST_BY_EMAIL_REQUEST,
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
      `${getBaseURL()}/api/item/getItemsByEmail/${email}`,
      config
    );

    dispatch({
      type: ITEM_LIST_BY_EMAIL_SUCCESS,
      payload: {
        loading: false,
        itemListEmail: data?.items,
      },
    });
  } catch (error) {
    dispatch({
      type: ITEM_LIST_BY_EMAIL_FAIL,
      payload: {
        loading: false,
        error: error,
      },
    });
  }
};
