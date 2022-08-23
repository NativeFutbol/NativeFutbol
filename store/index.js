import { configureStore } from "@reduxjs/toolkit";
import singleScreenDataReducer from "./singleScreenData";
import standingsDataReducer from "./standingsData";
import seasonReducer from "./season";
import topScorersReducer from "./topScorersData";
import topAssistsReducer from "./topAssistsData";
import mostCardsReducer from "./mostCardsData";

export const store = configureStore({
  reducer: {
    singleScreenData: singleScreenDataReducer,
    standingsData: standingsDataReducer,
    season: seasonReducer,
    topScorersData: topScorersReducer,
    topAssistsData: topAssistsReducer,
    mostCardsData: mostCardsReducer,
  },
});
