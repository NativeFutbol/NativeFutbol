import { createSlice } from "@reduxjs/toolkit";

const comparisonLeagueIdSlice = createSlice({
  name: "comparisonLeagueId",
  initialState: "39",
  reducers: {
    setCompareLeagueId: (state, action) => {
      switch (action.payload) {
        case "Premier League":
          return 39;
          break;
        case "Bundesliga":
          return 78;
          break;
        case "Ligue 1":
          return 61;
          break;
        case "La Liga":
          return 140;
          break;
        case "Serie A":
          return 135;
          break;
        default:
          return 39;
      }
    },
  },
});

export const setCompareLeagueId =
  comparisonLeagueIdSlice.actions.setCompareLeagueId;

export default comparisonLeagueIdSlice.reducer;
