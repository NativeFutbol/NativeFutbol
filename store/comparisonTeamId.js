import { createSlice } from "@reduxjs/toolkit";

const comparisonTeamIdSlice = createSlice({
  name: "comparisonTeamId",
  initialState: "0",
  reducers: {
    setComparisonTeamId: (state, action) => {
      return action.payload;
    },
  },
});

export const setComparisonTeamId =
  comparisonTeamIdSlice.actions.setComparisonTeamId;

export default comparisonTeamIdSlice.reducer;
