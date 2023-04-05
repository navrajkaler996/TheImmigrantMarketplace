import { configureStore } from "@reduxjs/toolkit";
import {
  userCreateAccountReducer,
  userLoginReducer,
  userModeReducer,
} from "./reducers/userReducers";
import { combineReducers } from "redux";
import { itemListReducer } from "./reducers/itemReducers";
import { messageReducer } from "./reducers/messageReducers";
import { chatReducer } from "./reducers/chatReducers";

/////Combining reducers
const users = combineReducers({
  createAccount: userCreateAccountReducer,
  login: userLoginReducer,
  items: itemListReducer,
  message: messageReducer,
  chat: chatReducer,
});

const store = configureStore({
  reducer: {
    users,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
