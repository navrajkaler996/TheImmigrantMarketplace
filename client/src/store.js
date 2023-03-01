import { configureStore } from "@reduxjs/toolkit";
import {
  userCreateAccountReducer,
  userLoginReducer,
} from "./reducers/userReducers";
import { combineReducers } from "redux";
import { itemListReducer } from "./reducers/itemReducers";

/////Combining reducers
const users = combineReducers({
  createAccount: userCreateAccountReducer,
  login: userLoginReducer,
  items: itemListReducer,
});

const store = configureStore({
  reducer: {
    users,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
