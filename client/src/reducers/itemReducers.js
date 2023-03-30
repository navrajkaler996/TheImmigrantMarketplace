import { useSelector } from "react-redux";
import {
  ITEM_ADD_CLEAR,
  ITEM_ADD_FAIL,
  ITEM_ADD_REQUEST,
  ITEM_ADD_SUCCESS,
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

const userInfo =
  localStorage.getItem("userInfo")?.length > 0 &&
  JSON.parse(localStorage.getItem("userInfo"));

const initialState = {};

export const itemListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ITEM_LIST_REQUEST: {
      return {
        ...state,
        loading: action?.payload?.loading,
      };
    }

    case ITEM_LIST_SUCCESS: {
      return {
        ...state,
        loading: action?.payload?.loading,
        list: action?.payload?.list,
      };
    }

    case ITEM_LIST_FAIL: {
      return {
        ...state,
        loading: action?.payload?.loading,
        error: action?.payload?.error,
      };
    }

    case ITEM_LIST_BY_CATEGORY_REQUEST: {
      return {
        ...state,
        loading: action?.payload?.loading,
      };
    }

    case ITEM_LIST_BY_CATEGORY_SUCCESS: {
      return {
        ...state,
        loading: action?.payload?.loading,
        list: action?.payload?.list,
      };
    }

    case ITEM_LIST_BY_CATEGORY_FAIL: {
      return {
        ...state,
        loading: action?.payload?.loading,
        error: action?.payload?.error,
      };
    }

    case ITEM_LIST_BY_ID_FAIL: {
      return {
        ...state,
        loading: action?.payload?.loading,
      };
    }

    case ITEM_LIST_BY_ID_SUCCESS: {
      return {
        ...state,
        loading: action?.payload?.loading,
        listItem: action?.payload?.listItem,
      };
    }

    case ITEM_LIST_BY_ID_REQUEST: {
      return {
        ...state,
        loading: action?.payload?.loading,
        error: action?.payload?.error,
      };
    }

    case ITEM_ADD_REQUEST: {
      return {
        ...state,
        loading: action?.payload?.loading,
      };
    }

    case ITEM_ADD_SUCCESS: {
      return {
        ...state,
        loading: action?.payload?.loading,
        itemAdded: action?.payload?.message,
      };
    }

    case ITEM_ADD_FAIL: {
      return {
        ...state,
        loading: action?.payload?.loading,
        error: action?.payload?.error,
      };
    }

    case ITEM_ADD_CLEAR: {
      return {
        ...state,
        itemAdded: action?.payload?.data,
      };
    }
    default:
      return state;
  }
};
