import { createSlice } from "@reduxjs/toolkit";

const seasonSlice = createSlice({
  name: "season",
  initialState: "2022",
  reducers: {
    setSeasonYear: (state, action) => {
      return action.payload;
    },
  },
});

export const setSeasonYear = seasonSlice.actions.setSeasonYear;

export default seasonSlice.reducer;
