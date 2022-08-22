import { createSlice } from "@reduxjs/toolkit";

const standingsDataSlice = createSlice({
  name: "standingsData",
  initialState: [],
  reducers: {
    setstandingsData: (state, action) => {
      return action.payload;
    },
  },
});

export const setstandingsData = standingsDataSlice.actions.setstandingsData;

export default standingsDataSlice.reducer;
