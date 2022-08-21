import { configureStore } from "@reduxjs/toolkit";
import singleScreenDataReducer from "./singleScreenData";

export const store = configureStore({
  reducer: { singleScreenData: singleScreenDataReducer },
});
