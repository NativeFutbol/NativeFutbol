import { createSlice } from "@reduxjs/toolkit";

const myTeamFiltersSlice = createSlice({
  name: "myTeamFilters",
  initialState: {
    season: "2022",
    league: "39",
    team: "",
    position: "",
  },

  reducers: {
    setMyTeamFilters: (state, { payload }) => {
      if (payload.label === "season") {
        state.season = payload.id;
      } else if (payload.label === "league") {
        state.league = payload.id;
      } else if (payload.label === "team") {
        state.team = payload.id;
      } else if (payload.label === "position") {
        state.position = payload.id;
      } else {
        return state;
      }
    },
  },
});

export const setMyTeamFilters = myTeamFiltersSlice.actions.setMyTeamFilters;

export default myTeamFiltersSlice.reducer;
