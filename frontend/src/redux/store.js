import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import chatReducer from "../redux/chatSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});
