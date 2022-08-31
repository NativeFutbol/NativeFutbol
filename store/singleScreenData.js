import { createSlice } from "@reduxjs/toolkit";

const singleScreenDataSlice = createSlice({
  name: "singleScreenData",
  initialState: {
    country: {},
    league: {},
    team: {},
    player: {},
  },
  reducers: {
    setSingleScreenData: (state, action) => {
      if (action.payload?.flag) {
        state.country = action.payload;
      } else if (action.payload?.league?.id) {
        state.league = action.payload;
      } else if (action.payload?.team?.id) {
        state.team = action.payload;
      } else if (action.payload?.player?.id) {
        state.player = action.payload;
      }
    },
    resetSingleCountryData: (state, { payload }) => {
      return { ...state, country: {} };
    },
  },
});

export const { setSingleScreenData, resetSingleCountryData } =
  singleScreenDataSlice.actions;

export default singleScreenDataSlice.reducer;
