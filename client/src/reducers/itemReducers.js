import {
  ITEM_LIST_FAIL,
  ITEM_LIST_REQUEST,
  ITEM_LIST_SUCCESS,
} from "../utils/actionConstants";

const userInfo =
  localStorage.getItem("userInfo")?.length > 0 &&
  JSON.parse(localStorage.getItem("userInfo"));

export const itemListReducer = (
  state = userInfo ? { userInfo } : {},
  action
) => {
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
    default:
      return state;
  }
};
