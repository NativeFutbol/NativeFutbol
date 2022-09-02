import { createSlice } from "@reduxjs/toolkit";

const leagueSlice = createSlice({
  name: "league",
  initialState: "39",
  reducers: {
    setLeagueId: (state, action) => {
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

export const setLeagueId = leagueSlice.actions.setLeagueId;

export default leagueSlice.reducer;
