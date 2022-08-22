import { configureStore } from "@reduxjs/toolkit";
import singleScreenDataReducer from "./singleScreenData";
import standingsDataReducer from "./standingsData";

export const store = configureStore({
  reducer: {
    singleScreenData: singleScreenDataReducer,
    standingsData: standingsDataReducer,
  },
});
