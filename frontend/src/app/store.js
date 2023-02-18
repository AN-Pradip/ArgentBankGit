import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Redux/user";

export default configureStore({
  reducer: { user: userReducer },
});