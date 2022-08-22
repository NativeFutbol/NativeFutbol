import { configureStore } from "@reduxjs/toolkit";
import singleScreenDataReducer from "./singleScreenData";
import standingsDataReducer from "./standingsData";
import seasonReducer from "./season";

export const store = configureStore({
  reducer: {
    singleScreenData: singleScreenDataReducer,
    standingsData: standingsDataReducer,
    season: seasonReducer,
  },
});
