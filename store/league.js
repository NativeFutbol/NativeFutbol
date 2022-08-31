import { createSlice } from "@reduxjs/toolkit";

const leagueSlice = createSlice({
  name: "league",
  initialState: "39",
  reducers: {
    setLeagueId: (state, action) => {
      return action.payload;
    },
  },
});

export const setLeagueId = leagueSlice.actions.setLeagueId;

export default leagueSlice.reducer;
