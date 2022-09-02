import { configureStore } from "@reduxjs/toolkit";
import singleScreenDataReducer from "./singleScreenData";
import standingsDataReducer from "./standingsData";
import seasonReducer from "./season";
import topScorersReducer from "./topScorersData";
import topAssistsReducer from "./topAssistsData";
import mostCardsReducer from "./mostCardsData";
import myTeamFiltersReducer from "./myTeamFilters";
import myTeamFilterOptionsReducer from "./myTeamFilterOptions";
import myPlayersReducer from "./myPlayers";
import myFormationReducer from "./myFormation";
import leagueReducer from "./league";
import storage from "redux-persist/lib/storage";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  version: 1,
  blacklist: [
    "singleScreenData",
    "standingsData",
    "season",
    "topScorersData",
    "topAssistsData",
    "mostCardsData",
    "myTeamFilters",
    "myTeamFilterOptions",
  ],
  storage,
};

const reducer = combineReducers({
  singleScreenData: singleScreenDataReducer,
  standingsData: standingsDataReducer,
  season: seasonReducer,
  topScorersData: topScorersReducer,
  topAssistsData: topAssistsReducer,
  mostCardsData: mostCardsReducer,
  myTeamFilters: myTeamFiltersReducer,
  myTeamFilterOptions: myTeamFilterOptionsReducer,
  league: leagueReducer,
  myPlayers: myPlayersReducer,
  myFormation: myFormationReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
