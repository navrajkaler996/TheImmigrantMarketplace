import { configureStore } from "@reduxjs/toolkit";
import {
  userCreateAccountReducer,
  userLoginReducer,
} from "./reducers/userReducers";
import { combineReducers } from "redux";

/////Combining reducers
const users = combineReducers({
  createAccount: userCreateAccountReducer,
  login: userLoginReducer,
});

// const preloadedState = {
//   login: user,
// };

const store = configureStore({
  reducer: {
    users,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
