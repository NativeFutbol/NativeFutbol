import { createSlice } from "@reduxjs/toolkit";

const myTeamFiltersSlice = createSlice({
  name: "myTeamFilters",
  initialState: {
    season: "2022",
    league: "39",
    team: "33",
    position: "Attacker",
  },

  reducers: {
    setMyTeamFilters: (state, action) => {
      return action.payload;
    },
  },
});

export const setMyTeamFilters = myTeamFiltersSlice.actions.setMyTeamFilters;

export default myTeamFiltersSlice.reducer;
