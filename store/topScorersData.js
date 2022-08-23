import { createSlice } from "@reduxjs/toolkit";

const topScorersDataSlice = createSlice({
  name: "topScorersData",
  initialState: [],
  reducers: {
    setTopScorersData: (state, action) => {
      return action.payload;
    },
  },
});

export const setTopScorersData = topScorersDataSlice.actions.setTopScorersData;

export default topScorersDataSlice.reducer;
