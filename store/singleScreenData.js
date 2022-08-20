import { createSlice } from "@reduxjs/toolkit";

const singleScreenDataSlice = createSlice({
  name: "singleScreenData",
  initialState: {},
  reducers: {
    setSingleScreenData: (state, action) => {
      return action.payload;
    },
  },
});

export const setSingleScreenData =
  singleScreenDataSlice.actions.setSingleScreenData;

export default singleScreenDataSlice.reducer;
