import { createSlice } from "@reduxjs/toolkit";

const topAssistsDataSlice = createSlice({
  name: "topAssistsData",
  initialState: [],
  reducers: {
    setTopAssistsData: (state, action) => {
      return action.payload;
    },
  },
});

export const setTopAssistsData = topAssistsDataSlice.actions.setTopAssistsData;

export default topAssistsDataSlice.reducer;
